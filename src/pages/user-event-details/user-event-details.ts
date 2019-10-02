import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {EventProvider} from "../../providers/event/event";
import firebase from "firebase";

/**
 * Generated class for the UserEventDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-event-details',
  templateUrl: 'user-event-details.html',
})
export class UserEventDetailsPage {
  public eventLists: Array<any>;
  public statement: string = "";
  path: string;
  colour: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public eventProvider: EventProvider
  ) {
  }

  ionViewWillEnter() {
    console.log('here');
    this.eventLists = [];
    firebase.database().ref('/userProfile/').orderByChild('eventList').once('value', (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        var list = childSnapshot.val();
        for (var key in list.eventList) {
          
          if (list.eventList.hasOwnProperty(key)) {
            if (key === this.navParams.get('eventId')) {
              //console.log(key);
              const name = "name";
              const county = "county";
              const date = "date";
              const venue = "venue";
              const description = "description";
              const colour = "colour";
              const email = "email";

              // const numOfTickets = "numOfTickets";
              // const numOfTicketsSold = "numOfTicketsSold";
              // var ticketsLeft = (list.eventList[key][numOfTickets] - list.eventList[key][numOfTicketsSold])
              // if (ticketsLeft === 0) {
              //   //console.log(ticketsLeft);
              //   this.statement = "Sorry No Tickets On Sale Event is Sold Out ";
              // }

              //console.log(list.eventList[key][name]);
              this.eventLists.push({
                id: key,
                name: list.eventList[key][name],
                date: list.eventList[key][date],
                venue: list.eventList[key][venue],
                description: list.eventList[key][description],
                county: list.eventList[key][county],
                colour: list.eventList[key][colour],
                email:list.eventList[key][email],

              });
              this.colour = list.eventList[key][county];
              var ProfilePicture = this.navParams.get('eventId');
              firebase.database().ref(`/test`).once('value', (snapshot) => {
                if (snapshot.val()[ProfilePicture]) {
                 
                  
                  this.path = snapshot.val()[ProfilePicture];
                 
                }
              });
              if(!(this.path)){
                this.path ="assets/img/noMediaUploaded.png";
                console.log(this.path);
              }
            }
          }
        }
        return false;
      })
    })

  }

  GoToPurchaseTicketsPage(eventId) {
    this.navCtrl.push('PurchaseTicketsPage', {eventId: eventId});
  }

  GoTotest(eventId) {
    this.navCtrl.push('TestPage', {eventId: eventId});
  }
}


//



