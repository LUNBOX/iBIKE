import { Component, } from '@angular/core';
import {IonicPage, NavController,AlertController,LoadingController,ToastController} from 'ionic-angular';
import {DeviceMotionAccelerationData,DeviceMotion}from'@ionic-native/device-motion'
// import {BackgroundMode} from "@ionic-native/background-mode";
import {Geolocation} from "@ionic-native/geolocation";
import {AndroidPermissions} from "@ionic-native/android-permissions";
import { ProfileProvider } from '../../providers/profile/profile';
import { User } from '@firebase/auth-types';
// import {AndroidPermissions} from "@ionic-native/android-permissions";
import { Reference } from '@firebase/database-types';
import firebase from "firebase";
//import { BackgroundMode } from '@ionic-native/background-mode'
declare var SMS:any;

@IonicPage()
@Component({
  selector: 'page-accident-protector-system',
  templateUrl: 'accident-protector-system.html',
})
export class AccidentProtectorSystemPage {
  public data: any;
  public text:any;
  public alertPresented: any;
  public data2: any;
  public dist:any;
  public x1:any;
  public y1:any;
  public z1:any;
  public x2:any;
  public y2:any;
  public z2:any;
  subscription: any;
  timeout: any;
  textMessage: string;
  phoneNumber: Reference;
  currentUser: User;
  public userProfile: any;
  public birthDate: string;
  public FirstContactNumber:number;
  public FirstContactNumberResponse:string;
  public b:string;
  loading: any;
  constructor(
    // private backgroundMode: BackgroundMode
    public loadingCtrl: LoadingController,public profileProvider: ProfileProvider,private deviceMotion: DeviceMotion,public navCtrl: NavController,public alertCtrl: AlertController, public geolocation: Geolocation,private androidPermissions: AndroidPermissions, public toastController: ToastController) {
      this.alertPresented = false
    this.loading = this.loadingCtrl.create();
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.currentUser = user;
        this.phoneNumber = firebase.database().ref(`/userProfile/${user.uid}/FirstContactNumber`);
        this.userProfile = firebase.database().ref(`/userProfile/${user.uid}`);
        firebase.database().ref(`/userProfile/${user.uid}`).once('value',(snapshot) => {
          this.FirstContactNumberResponse = snapshot.val().FirstContactNumber;
        })
      }
    })
  }
  setTimeout1(){
    this.timeout=10000;
  }
  setTimeout2(){
    this.timeout=20000;
  }
  setTimeout3(){
    this.timeout=30000;
  }
  StartDrop1() {
    this.deviceMotion.getCurrentAcceleration().then(
      (acceleration: DeviceMotionAccelerationData) => console.log(acceleration),
      (error: any) => alert(error)
    );
  
    this.subscription = this.deviceMotion.watchAcceleration().subscribe((acceleration: DeviceMotionAccelerationData) => {
      console.log(acceleration);
      this.data2 = acceleration;
      this.x2 = this.data2.x
      this.y2 = this.data2.y
      this.z2 = this.data2.z
      // this.subscription.unsubscribe();
      this.cal()
     
  })}
  cal(){
    var finalx=this.x1 -this.x2
    // alert(finalx)
    // alert(this.x1)
    // alert(this.x2)
    // alert(this.z1)
    var finaly=this.y1 -this.y2
    var finalz=this.z1 -this.z2
    this.dist = Math.sqrt( finalx*finalx + finaly*finaly + finalz*finalz);
    let vm = this
    this.timeout = 10000
    this.geolocation.getCurrentPosition().then((resp) => {
      let pos = {
        lat: resp.coords.latitude,
        lng: resp.coords.longitude
      };
      this.text = JSON.stringify(pos);
    })
    if(!vm.alertPresented && this.dist >=10.395) {
      vm.alertPresented = true
      this.dist=0;
      this.subscription.unsubscribe();
      let timeout;
      const alert = this.alertCtrl.create({
        title: 'Safety Alert',
        subTitle: 'iBIKE has detected you may have been in an accident. Is this true?',
        buttons: [{
          text: 'Disagree',
          handler: () => {
            vm.alertPresented = false
            console.log('Disagree clicked');
            alert.dismiss();
            this.dist=0;
            clearTimeout(timeout);
          }
        },
          {
            text: 'Agree',
            handler: () => {
              alert.dismiss();
              vm.alertPresented = false
              // this.navCtrl.push('SmsPage');
              clearTimeout(timeout);
              this.textMessage ="I have been in accident and iBIKE is sending you a message to please check if I am ok. I am located at " + this.text;
              SMS.sendSMS(this.FirstContactNumberResponse, this.textMessage);
              console.log('Agree clicked');
            }
          }
        ]
      });
      alert.present();
      timeout = setTimeout(() => {
        alert.dismiss();
        let options = {
          replaceLineBreaks: false, // true to replace \n by a new line, false by default
          android: {
            intent: ''  // send SMS with the native android SMS messaging
           
          }
        };
        var success = function () {
          // alert('Message compiled/sent successfully');
        };
        var error = function (e) {
          // alert('Message Failed:' + e);
        };
        this.geolocation.getCurrentPosition().then((resp) => {
          let pos = {
            lat: resp.coords.latitude,
            lng: resp.coords.longitude
          };
          var text = JSON.stringify(pos);
        
          this.textMessage ="I have been in accident and iBIKE is sending you a message to please check if I am ok. I am located at " + text;
          var messageInfo = { phoneNumber: "0871357817", textMessage: "This is a test message" };
          this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.SEND_SMS).then(() => { SMS.sendMessage(messageInfo,function(message) { }, function(error) { }); }).catch((err) => { console.log(JSON.stringify(err)); }); 
          SMS.sendSMS(this.FirstContactNumberResponse, this.textMessage, options, success, error);
          // this.sms.send('0871357817', 'Hello world!');
          vm.alertPresented = false
        }).catch((error) => {
          console.log('Error getting location', error);
        
          this.loading.dismiss();
        });
       
      }, this.timeout);
    
    }
  }

  
  async startWatching() { 
    this.alertPresented = false
    const toast = await this.toastController.create({
      message: 'Default timeout is 10 seconds',
      position: 'top',
      duration: 3000
    });
    toast.present();
  
    // this.backgroundMode.enable();
    this.profileProvider.getUserProfile().on('value', userProfileSnapshot => {
      this.userProfile = userProfileSnapshot.val();
      this.birthDate = userProfileSnapshot.val().birthDate;
      this.FirstContactNumber = userProfileSnapshot.val().FirstContactNumber;
    });
  
    this.deviceMotion.getCurrentAcceleration().then(
      (acceleration: DeviceMotionAccelerationData) => console.log(acceleration),
      (error: any) => alert(error)
    );

    this.subscription = this.deviceMotion.watchAcceleration().subscribe((acceleration: DeviceMotionAccelerationData) => {
      console.log(acceleration);
      this.data = acceleration;
      this.x1 = this.data.x
      this.y1 = this.data.y
      this.z1 = this.data.z
      this.StartDrop1()
    });
  

  }
 
// Stop watch
  stopWatching() {
      this.alertPresented = true
      // this.backgroundMode.disable();
      this.subscription.unsubscribe();
      alert("You have disabled iBIKE Safety Feature");
    }
    
  
      present(title, subTitle) {
        let vm = this
        if(!vm.alertPresented) {
          vm.alertPresented = true
          vm.alertCtrl.create({
            title: title,
            subTitle: subTitle,
            buttons: [{
              text: 'OK',
              handler: () => {
                vm.alertPresented = false
              }
            }],
          }).present();
        }
      }
        async deleteToast() {
          const toast = await this.toastController.create({
            message: 'Your account has been deleted',
            duration: 2000
          });
          toast.present();
        }
      }
    
    


