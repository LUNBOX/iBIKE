import { Component } from '@angular/core';
import { IonicPage,NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { User } from '@firebase/auth-types';
import firebase from "firebase";
import { Reference } from '@firebase/database-types';


@IonicPage()
@Component({
  selector: 'page-dublin-chat-room',
  templateUrl: 'dublin-chat-room.html',
})
export class DublinChatRoomPage {

  user:string = ''
  message:string = ''
  messages: object[];
  currentUser: User;
  firstName: Reference;
  phoneNumber: Reference;
  public userProfile: any;
  FName: String;
  constructor(public navParam: NavParams,public db: AngularFireDatabase) {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.currentUser = user;
        this.firstName = firebase.database().ref(`/userProfile/${user.uid}/firstName`);
        this.userProfile = firebase.database().ref(`/userProfile/${user.uid}`);
        firebase.database().ref(`/userProfile/${user.uid}`).once('value',(snapshot) => {
          this.FName = snapshot.val().firstName;

              //console.log(snapshot.val().myEvents);
              //console.log(this.attendingEvents);


        })
        this.db.list('/chat/Dublin').valueChanges().subscribe(data => {
          this.messages = data
        });
      }
    })
  }
  sendMessage(){
    // alert(this.user);
    this.db.list('/chat/Dublin').push({
      userName: this.FName,
      message: this.message
    }).then(() => {
      // alert(this.message);
      this.message = ''
      // alert(this.message);
    })
  }
}