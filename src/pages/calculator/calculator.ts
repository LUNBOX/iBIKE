import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, LoadingController } from 'ionic-angular';
import { Diagnostic } from '@ionic-native/diagnostic';
import { OpenNativeSettings } from '@ionic-native/open-native-settings';
import { Geolocation } from '@ionic-native/geolocation';
import { Insomnia } from '@ionic-native/insomnia';
import { DistanceCalculationProvider, DatabaseProvider, UnitConvertorProvider, MapProvider } from '../../providers';
import * as moment from 'moment';

export interface DistanceTime
{
  distance: number,
  time: number
}

@IonicPage({ name: 'calculation-page' })
@Component({
  selector: 'page-calculator',
  templateUrl: 'calculator.html',
})
export class CalculatorPage

{
  calculating = false;
  distanceCovered: number;
  speed: number;
  distanceTimeArr: Array<DistanceTime> = new Array<DistanceTime>();

  map: any;
  timer: any;

  lat1: number;
  lon1: number;
  lat2: number;
  lon2: number;

  s_lat: number;
  s_lon: number;
  d_lat: number;
  d_lon: number;

  time1 = 0;
  time2 = 0;
  totalTime = 0;
  public timer1 = "00:00:00";
  public startButton = "START";
  public seconds;
  public minutes;
  public hours;
  public start;
  public default;
  public timer_id;
  public addZero = function(value) {
    if (value < 10) {
      value = '0' + value;
    }
    return value;
  };
  constructor(public navCtrl: NavController, private diagnostic: Diagnostic, private alertCtrl: AlertController, private insomnia: Insomnia,
              private openSettings: OpenNativeSettings, private gps: Geolocation, private distCal: DistanceCalculationProvider,
              private loading: LoadingController, private db: DatabaseProvider, private unitConv: UnitConvertorProvider, private mapProvider: MapProvider
  ) { }

  ionViewDidLoad()
  {
    this, this.insomnia.keepAwake()
      .then(() => { });

    this.diagnostic.isGpsLocationEnabled()
      .then(status =>
      {
        if (status)
        {
          let loading = this.loading.create({
            content: 'get Location',
          });
          loading.present();

          this.gps.getCurrentPosition({ enableHighAccuracy: true })
            .then(data =>
            {
              this.lat1 = this.lat2 = this.s_lat = data.coords.latitude;
              this.lon1 = this.lon2 = this.s_lon = data.coords.longitude;

              this.map = this.mapProvider.initMap(this.lat1, this.lon1);

              loading.dismiss();
              this.startCalculation();
            })
            .catch(error =>
            {
              loading.dismiss();
            });
        } else
        {
          this.createAlert();
        }
      });
  }
  startStop() {
    if (this.startButton === "START") {
      this.start = new Date();
      this.timer_id = setInterval(() => {
        this.seconds = Math.floor((new Date().getTime() - this.start.getTime()) / 1000);
        this.minutes = Math.floor(this.seconds / 60);
        this.hours = Math.floor(this.minutes / 60);

        this.seconds = this.seconds - this.minutes * 60;
        this.minutes = this.minutes - this.hours * 60;

        // 1桁の場合は0を補完
        this.hours = this.addZero(this.hours);
        this.minutes = this.addZero(this.minutes);
        this.seconds = this.addZero(this.seconds);

        this.timer = this.hours + ':' + this.minutes + ':' + this.seconds;
      }, 10);

      // STOP
      this.startButton = "STOP";
      this.default = "danger";
    } else {
      clearInterval(this.timer_id);

      // START
      this.startButton = "START";
      this.default = "default";
    }
  }
  startCalculation()
  
  {  if (this.startButton === "START") {
    this.start = new Date();
    this.timer_id = setInterval(() => {
      this.seconds = Math.floor((new Date().getTime() - this.start.getTime()) / 1000);
      this.minutes = Math.floor(this.seconds / 60);
      this.hours = Math.floor(this.minutes / 60);

      this.seconds = this.seconds - this.minutes * 60;
      this.minutes = this.minutes - this.hours * 60;

      // 
      this.hours = this.addZero(this.hours);
      this.minutes = this.addZero(this.minutes);
      this.seconds = this.addZero(this.seconds);

      this.timer = this.hours + ':' + this.minutes + ':' + this.seconds;
    }, 10);

    // STOP
    this.startButton = "STOP";
    this.default = "danger";
  } else {
    clearInterval(this.timer_id);

    // START
    this.startButton = "START";
    this.default = "default";
  }

    this.distanceCovered = 0;
    this.speed = 0;
    this.calculating = true;
    this.timer = setInterval(() =>
    {
      this.totalTime += 1;
    }, 1000);
    this.calculateSpeed();
  }

  stopCalculation()
  {
    this.calculating = false;
    clearInterval(this.timer);
    clearInterval(this.timer_id);
    this.d_lat = this.lat2;
    this.d_lon = this.lon2;

    let date = moment().format('DD/MM/YYYY');
    this.totalTime = +this.unitConv.secondToMinute(Math.floor(this.totalTime)).toFixed(2);

    const averageSpeed = +this.calculateAverageSpeed(this.distanceTimeArr).toFixed(2);
    console.log('stopCalculation: ', averageSpeed);
    this.addRecord(this.s_lon, this.s_lat, this.d_lon, this.d_lat, this.totalTime, this.distanceCovered, averageSpeed, date);
  }

  calculateSpeed()
  {
    let date = new Date();

    if (this.calculating)
    {
      this.gps.getCurrentPosition({ enableHighAccuracy: true })
        .then(data =>
        {
          this.lat1 = this.lat2;
          this.lon1 = this.lon2;

          this.lat2 = data.coords.latitude;
          this.lon2 = data.coords.longitude;

          this.mapProvider.setMap(this.lat2, this.lon2, this.map);

          this.time1 = this.time2;
          this.time2 = date.getTime();

          let distance = this.distCal.calcDistance(this.lat1, this.lon1, this.lat2, this.lon2);

          let duration = 0;

          let timeDiffer = this.time2 - this.time1;
          duration = this.unitConv.msToSecond(timeDiffer);

          this.distanceTimeArr.push({ distance: distance, time: duration }); // distance in meter, time in second
          console.log('calculateSpeed: ', this.distanceTimeArr);

          this.speed = +this.unitConv.mPerSecondToKmPerHour(Math.floor(distance / duration)).toFixed(1);
          distance = distance / 1000;


          this.distanceCovered += distance;
          this.distanceCovered = +this.distanceCovered.toFixed(2);

          this.calculateSpeed();
        });
    }
  }

  createAlert()
  {
    let alert = this.alertCtrl.create({
      title: 'GPS disabled',
      message: 'Please turn on your GPS device',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () =>
          {
            this.navCtrl.pop();
          }
        },
        {
          text: 'Ok',
          handler: () =>
          {
            this.navCtrl.pop();
            this.openSettings.open('location');
          }
        }
      ]
    });
    alert.present();
  }

  addRecord(s_lon: number, s_lat: number, d_lon: number, d_lat: number, time: number, distance: number, averageSpeed: number, date: string)
  {
    this.db.addRecord(s_lon, s_lat, d_lon, d_lat, time, distance, averageSpeed, date)
      .then(() => { })
      .catch((e) =>
      {
        console.log(e);
      });
  }

  calculateAverageSpeed(input: DistanceTime[])
  {
    let totalD = 0;
    let totalT = 0;
    let average = 0;

    for (let i = 1; i < input.length; i++)
    {
      totalT += input[i].time;
      totalD += input[i].distance;
    }

    console.log('T: ', totalT, ' D: ', totalD);

    average = totalD / totalT;
    average = this.unitConv.mPerSecondToKmPerHour(average);
    return average;
  }

  ionViewDidLeave()
  {
    if (this.calculating)
    {
      this.stopCalculation();
    }
  }
}
