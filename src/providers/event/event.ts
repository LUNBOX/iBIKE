import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { Reference, ThenableReference } from '@firebase/database-types';


@Injectable()
export class EventProvider {
  public eventListRef: Reference;
  public eventOrganiserUID: string;
  public currentEventOwner: Reference;
  public path: Reference;
  public soldTickets: number;
  public eventLists : Array<any>;
  public arrayTickets : Array<any>;
  public numOfTickets : number;
  public stolen:string;
  stolenStatus: Reference;

  constructor() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        //console.log(firebase.auth().currentUser);
        this.eventListRef = firebase.database().ref(`/userProfile/${user.uid}/eventList`);
        this.eventOrganiserUID = user.uid;
      }
    })
  }

  createEvent(
    eventName: string,
    eventDate: string,
    eventDescription: string,
    eventVenue: string,
    eventCounty: string,
    eventColour:string,
    eventStolenStatus:string,
    eventEmail:string,
    /*eventImage: string,*/
  ): ThenableReference {
    return this.eventListRef.push({
      name: eventName,
      date: eventDate,
      description: eventDescription,
      venue: eventVenue,
      county: eventCounty,
      colour: eventColour,
      email: eventEmail,
      stolenStatus:eventStolenStatus,
     /* savedProfilePicture: eventImage,*/
      eventOrganisersID:this.eventOrganiserUID,
    //this.createArray(eventTickets)
    });
  }

  

  

  updateStolenStatus(eventId: string): void {
    this.eventLists = [];
    firebase.database().ref('/userProfile/').orderByChild('eventList').once('value', (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        var list = childSnapshot.val();
        for (var key in list.eventList) {
          if (list.eventList.hasOwnProperty(key)) {
            if (key ===eventId) {
              var stolenStatus: any;
              stolenStatus = "stolenStatus";
              const eventOrganisersID = "eventOrganisersID";
              this.stolen = list.eventList[key][stolenStatus];
              this.currentEventOwner = list.eventList[key][eventOrganisersID];
              //console.log("This should always print");
              this.path = firebase.database().ref(`/userProfile/${this.currentEventOwner}/eventList/${eventId}`);
              //console.log(this.path);
              //console.log(this.soldTickets);
              this.stolen = "User_Confirmed_Bike_As_Stolen";
              stolenStatus = this.stolen
              this.path.update({stolenStatus});
            }
          }
        }
        return false;
      })
    });
  }

  updateFoundStatus(eventId: string): void {
    this.eventLists = [];
    firebase.database().ref('/userProfile/').orderByChild('eventList').once('value', (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        var list = childSnapshot.val();
        for (var key in list.eventList) {
          if (list.eventList.hasOwnProperty(key)) {
            if (key ===eventId) {
              var stolenStatus: any;
              stolenStatus = "stolenStatus";
              const eventOrganisersID = "eventOrganisersID";
              this.stolen = list.eventList[key][stolenStatus];
              this.currentEventOwner = list.eventList[key][eventOrganisersID];
              //console.log("This should always print");
              this.path = firebase.database().ref(`/userProfile/${this.currentEventOwner}/eventList/${eventId}`);
              //console.log(this.path);
              //console.log(this.soldTickets);
              this.stolen = "notStolen";
              stolenStatus = this.stolen
              this.path.update({stolenStatus});
            }
          }
        }
        return false;
      })
    });
  }





  createArray(
    numberOfTickets: number,
  ):Array<number> {

    let array = [];
    for (let i = 0; i < numberOfTickets; i++) {
      array[i] = i;
    }
    return array;
  }



  getEventList(): Reference {
    return this.eventListRef;
  }

  getEventDetail(eventId: string): Reference {
    return this.eventListRef.child(eventId);
  }
}
