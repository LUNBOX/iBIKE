import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { BarcodeScanner, BarcodeScannerOptions} from "@ionic-native/barcode-scanner";
import firebase from "firebase";


/**
 * Generated class for the ScannerTestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-scanner-test',
  templateUrl: 'scanner-test.html',
})
export class ScannerTestPage {
  options: BarcodeScannerOptions;
  results: {};
  attendingEvents: Array<string>;
  tickets: Array<string>;
  myEvents: Array<string>;
  events: Array<string>;
  statement: string = "";
  public eventLists: Array<any>;
  Firstname: string;
  Surname :string;
  email: string;


  constructor(public navCtrl: NavController, private bardcode: BarcodeScanner) {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.events = [];
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad ScannerTestPage');
  }


  async scanBarcode() {

    this.results = await this.bardcode.scan();
    console.log(this.results);
    const text = "text";
    console.log(this.results[text]);
    await firebase.database().ref(`/userProfile/${this.results[text]}`).orderByChild('eventList').once('value', (snapshot) => {
      // alert(firebase.database().ref(`/userProfile/${this.results[text]}`));
      this.attendingEvents = snapshot.val().myEvents;
      this.email = snapshot.val().email;
      this.Firstname = snapshot.val().firstName;
      this.Surname = snapshot.val().lastName;
      console.log(this.attendingEvents);
     
      this.eventLists = [];
      // await firebase.database().ref('/userProfile/').orderByChild('eventList').once('value', (snapshot) => {
        const stolen = "stolenStatus";
        var list = snapshot.val();
        for (var key in list.eventList) {
  
         if (list.eventList.hasOwnProperty(key) && list.eventList[key][stolen] == "User_Confirmed_Bike_As_Stolen"){
            this.statement ="One of " + this.Firstname + " " + this.Surname + " bikes has been reported as stolen and email is " + this.email;
            this.navCtrl.push('ScannedResultPage');
          
        }

        }
        return false;
      // })
    });
    if(!this.statement){
      this.statement = "This bike has not been reported as stolen";
      this.navCtrl.push('NoTicketPage');
    }
  }
}

