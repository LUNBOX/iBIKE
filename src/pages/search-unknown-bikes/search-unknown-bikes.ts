import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import firebase from "firebase";
import {EventProvider} from "../../providers/event/event";


@IonicPage()
@Component({
  selector: 'page-search-unknown-bikes',
  templateUrl: 'search-unknown-bikes.html',
})
export class SearchUnknownBikesPage {

  public eventLists: Array<any>;
  public array: Array<any>;
  public events;
  public items;
  public stolen:string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public eventProvider: EventProvider) {
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
            const date = "date";
            const venue = "venue";
            const description = "description";
            const colour = "colour";
            const county = "county";

            //console.log(list.eventList[key][name]);
            this.eventLists.push({
              id: key,
              name: list.eventList[key][name],
              date: list.eventList[key][date],
              venue: list.eventList[key][venue],
              
              description: list.eventList[key][description],
              colour: list.eventList[key][colour],
              county: list.eventList[key][county],
            });
          }
        }
        return false;
      })
    });
  }


  GoToUserEventDetailPage(eventId) {
    this.navCtrl.push('UserEventDetailsPage', {eventId: eventId});
  }

  initializeItems() {
    this.array = this.eventLists;
  }
  reset(){
    this.navCtrl.setRoot('SearchPage');
  }

  getItems(find) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the find target
    var query = find.target.value;

    // if the value is an empty string don't filter the items
    if (query && query.trim() != '') {
      this.eventLists = this.eventLists.filter((v) => {
        if (v.name && query) {
          if (v.name.toLowerCase().indexOf(query.toLowerCase()) > -1) {
            return true;
          }
          else if (v.colour.toLowerCase().indexOf(query.toLowerCase()) > -1) {
            return true;
          }
          else if (v.venue.toLowerCase().indexOf(query.toLowerCase()) > -1) {
            return true;
          }
          return false;
        }
      });

      console.log(query, this.eventLists.length);

    }
  }
}
