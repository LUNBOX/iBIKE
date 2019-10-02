import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { User, AuthCredential } from '@firebase/auth-types';
import { Reference } from '@firebase/database-types';


@Injectable()
export class ProfileProvider {
  userProfile: Reference;
  currentUser: User;
  userListRef: Reference;
  stolenStatus: Reference;
  events: Reference;
  eventLists: Array<string>;
  attendingEvents: Array<string>;
  public soldTickets: Reference;

  constructor() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.currentUser = user;
        this.stolenStatus = firebase.database().ref(`/userProfile/${user.uid}/eventList/eventId`);
        this.userProfile = firebase.database().ref(`/userProfile/${user.uid}`);
        this.userListRef = firebase.database().ref(`/userProfile/`);
        firebase.database().ref(`/userProfile/${user.uid}`).once('value',(snapshot) => {
          this.attendingEvents = snapshot.val().myEvents;
          var list = snapshot.val().eventList;
          const numOfTicketsSold = "stolenStatus";
          for (var key in list.eventList) {
            if (list.eventList.hasOwnProperty(key)) {
              // if (key === this.navParams.get('eventId')) {

                this.soldTickets = list.eventList[key][numOfTicketsSold];

                //console.log(snapshot.val().myEvents);
                //console.log(this.attendingEvents);
              }
            }

        })
      }
    })
  }

  getUserProfile(): Reference {
    return this.userProfile;
  }

  // makeMyEvents(): Promise<any>{
  //   var myEvents: Array<string> = [];
  //   myEvents[0] = "events";
  //   return this.userProfile.update({ myEvents});
  // }


  updateName(firstName: string, lastName: string): Promise<any> {
    return this.userProfile.update({ firstName, lastName });
  }

  updateDOB(birthDate: string): Promise<any> {
    return this.userProfile.update({ birthDate });
  }
  updateNumber(FirstContactNumber: number): Promise<any> {
    return this.userProfile.update({FirstContactNumber });
  }
  updateUserType(userType: string): Promise<any> {
    if(userType==="customer"){
      

    }
    return this.userProfile.update({userType});
  }

  updateEvents(eventId: string) {
    firebase.database().ref(`/userProfile/${this.currentUser.uid}`).once('value',(snapshot) => {
      this.attendingEvents=snapshot.val().myEvents;
    })
    //console.log(this.attendingEvents);
    var myEvents = this.attendingEvents;
    console.log(eventId);
    var isPresent = false;
    for(var i= 0; i <=this.attendingEvents.length -1; i++){
      if(this.attendingEvents[i]===eventId){
        isPresent = true;
      }
    }
    if(!isPresent){
      myEvents.push(eventId);
    }
    return this.userProfile.update({myEvents});
  }



  updateEmail(newEmail: string, password: string): Promise<any> {
    const credential: AuthCredential = firebase.auth.EmailAuthProvider.credential(
      this.currentUser.email,
      password
    );
    return this.currentUser
      .reauthenticateWithCredential(credential)
      .then(user => {
        this.currentUser.updateEmail(newEmail).then(user => {
          this.userProfile.update({ email: newEmail });
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  // updateStolenStatus(stolenStatus:string){
  //   return this.stolenStatus.update({stolenStatus});
  // };



  updatePassword(newPassword: string, oldPassword: string): Promise<any> {
    const credential: AuthCredential = firebase.auth.EmailAuthProvider.credential(
      this.currentUser.email,
      oldPassword
    );

    return this.currentUser
      .reauthenticateWithCredential(credential)
      .then(user => {
        this.currentUser.updatePassword(newPassword).then(user => {
          console.log('Password Changed');
        });
      })
      .catch(error => {
        console.error(error);
      });
  }
}
