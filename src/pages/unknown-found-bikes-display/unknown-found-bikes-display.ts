import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {EventProvider} from "../../providers/event/event";
import firebase from 'firebase';
import { User} from '@firebase/auth-types';
@IonicPage()
@Component({
  selector: 'page-unknown-found-bikes-display',
  templateUrl: 'unknown-found-bikes-display.html',
})
export class UnknownFoundBikesDisplayPage {

  public eventLists: Array<any>;
  public events;
  public items;
  public stolen:string;
  public countryRef: firebase.database.Reference;
  currentUser: User;
  path: string;
  colour: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public eventProvider: EventProvider) {
    this.countryRef = firebase.database().ref('/userProfile/eventList')
    this.initializeItems();
  }


  ionViewWillEnter() {


    this.eventLists = [];
    firebase.database().ref('/userProfile/').orderByChild('eventList').once('value', (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        const stolen= "stolenStatus";
        var list = childSnapshot.val();
        for (var key in list.eventList) {
          if (list.eventList.hasOwnProperty(key)&&list.eventList[key][stolen]=="UnknownBikeFound")  {
             
            //console.log(key);
            const name = "name";
            const county = "county";
            const date = "date";
            const venue = "venue";
           
            const description = "description";
            const colour = "colour";
            const email = "email";
//           const colour = "colour";
//           const county = "county";
          const stolen= "stolenStatus";

            //console.log(list.eventList[key][name]);
            this.eventLists.push({
              id: key,
              name: list.eventList[key][name],
              date: list.eventList[key][date],
              venue: list.eventList[key][venue],
              
              description: list.eventList[key][description],
              county: list.eventList[key][colour],
              colour: list.eventList[key][county],
              email:list.eventList[key][email],
              stolen:list.eventList[key][stolen],

            });
            // this.colour = list.eventList[key][county];
            // alert(this.colour);
            // alert(ProfilePicture)
            // var ProfilePicture = this.navParams.get('eventId');
            // firebase.database().ref(`/test`).once('value', (snapshot) => {
            //   if (snapshot.val()[ProfilePicture]) {
            //     this.path = snapshot.val()[ProfilePicture];

            //   }
            // })
            if (!(this.path)) {
              console.log(this.colour);
              if (list.eventList[key][county] === "White") {
                this.path = "assets/img/sport.jpg";
                //console.log(this.path);
              }
              else if (list.eventList[key][county] === "Red") {
                this.path = "assets/img/music.jpg";
                //console.log(this.path);
              }
              else if (list.eventList[key][county] === "Black") {
                this.path = "assets/img/comedy.jpg";
                //console.log(this.path);
              }
              else if (list.eventList[key][county] === "Grey") {
                this.path = "assets/img/art.jpg";
                //console.log(this.path);
              }
              else {
                var ProfilePicture = this.navParams.get('eventId');
                firebase.database().ref(`/test`).once('value', (snapshot) => {
                  if (snapshot.val()[ProfilePicture]) {
                    this.path = snapshot.val()[ProfilePicture];
    
                  }
                // console.log(this.path);
              })
          
            }
          
          }
        }
        }

      return false;
    })
  })

}

  GoToUserEventDetailPage(eventId) {
    this.navCtrl.push('UserEventDetailsPage', {eventId: eventId});
  }

  initializeItems() {
    this.eventLists = this.eventLists;
    console.log(this.eventLists);
  }

  getItems(ev) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the ev target
    var q = ev.target.value;

    // if the value is an empty string don't filter the items
    if (q && q.trim() != '') {
      this.eventLists = this.eventLists.filter((v) => {
        if (v.name && q) {
          if (v.name.toLowerCase().indexOf(q.toLowerCase()) > -1) {
            return true;
          }
          else if (v.colour.toLowerCase().indexOf(q.toLowerCase()) > -1) {
            return true;
          }
          else if (v.venue.toLowerCase().indexOf(q.toLowerCase()) > -1) {
            return true;
          }
          return false;
        }
      });

      console.log(q, this.eventLists.length);

    }
  }
}

