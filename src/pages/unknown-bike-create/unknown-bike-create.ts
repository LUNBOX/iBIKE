import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { EventProvider } from '../../providers/event/event';
import 'firebase/storage'
import { User} from '@firebase/auth-types';
import { Reference } from '@firebase/database-types';
import firebase from "firebase";


@IonicPage()
@Component({
  selector: 'page-unknown-bike-create',
  templateUrl: 'unknown-bike-create.html',
})
export class UnknownBikeCreatePage {
  statement:string="";
  a:"UnknownBikeFound";
  currentUser: User;
  userProfile: Reference;
  userListRef: Reference;
  email:string;
  constructor(public navCtrl: NavController,
              public eventProvider: EventProvider)
               { firebase.auth().onAuthStateChanged(user => {
                 if (user) {
                   this.currentUser = user;
                   this.userProfile = firebase.database().ref(`/userProfile/${user.uid}/email`);
                   firebase.database().ref(`/userProfile/${user.uid}`).once('value',(snapshot) => {
                     this.email = snapshot.val().email;

                   })

                 }
})
}



createEvent(eventName: string,
              eventDate: string,
              eventDescription: string,
              venue: string,
              county: string,
              colour: string,
              stolenStatus:string,
              email:string
              /*savedProfilePicture: string*/
  ): void {
    if(eventName == null ||  eventDate== null || eventDescription== null || venue== null || county== null || colour== null){
      //this.statement="Please fill in all fields";
      alert("Please fill in all fields");
    }
    else  {
      //county='Dublin'
      //colour=  'string'
      this.eventProvider
        .createEvent(eventName, eventDate, eventDescription, venue, county,colour,'UnknownBikeFound',this.email)
        .then(newEvent => {
          this.navCtrl.push('UnknownFoundBikesDisplayPage');
        });
    }
  }
}


