import { Component } from '@angular/core';
import { IonicPage, NavController} from 'ionic-angular';
import { BarcodeScanner, BarcodeScannerOptions} from "@ionic-native/barcode-scanner";
import firebase from "firebase";

/**
 * Generated class for the QrScannerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-qr-scanner',
  templateUrl: 'qr-scanner.html',
})
export class QrScannerPage {

  options: BarcodeScannerOptions;
  results: {};
  attendingEvents: Array<string>;
  tickets: Array<string>;
  myEvents:Array<string>;
  events:Array<string>;
  statement:string="";



  constructor(public navCtrl: NavController, private bardcode: BarcodeScanner) {

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.events= [];
        firebase.database().ref(`/userProfile/${user.uid}/`).once('value', (snapshot) => {
          var list = snapshot.val();
          for (var key in list.eventList) {
            if (list.eventList.hasOwnProperty(key)) {
              this.events.push(key);
            }
          }
        })

      }
    })
  }

  async scanBarcode() {
    console.log(this.events);
    this.results = await this.bardcode.scan();
    const text = "text";
    console.log(this.results[text]);


    await firebase.database().ref(`/userProfile/${this.results[text]}`).once('value', (snapshot) => {
      // alert(firebase.database().ref(`/userProfile/${this.results[text]}`));
      this.attendingEvents = snapshot.val().myEvents;
      console.log(this.attendingEvents);
      console.log(this.events);
      for (var i = 0; i <= this.attendingEvents.length - 1; i++) {
        //console.log("aaaaaaaaaaaaaaaaa");
        for (var y = 0; y <= this.events.length - 1; y++) {
          //console.log("bbbbbbbbbbb");
          console.log(this.attendingEvents[i] == this.events[y])
          if(this.attendingEvents[i] == this.events[y]) {
            alert("this bike has been stolen")
            /*this.statement= "The number of tickets bought for this event is: " + this.attendingEvents[i+1].toString();*/
            this.statement = "This bike has been reported as stolen" + this.events;
            this.navCtrl.push('ScannedResultPage');
            console.log(this.statement);
          }
        }

        //console.log(snapshot.val().myEvents);
        //console.log(this.attendingEvents);
      }
      if(!this.statement){
        this.statement = "This bike has not been reported as stolen";
        this.navCtrl.push('NoTicketPage');
      }
    })
  }
}





