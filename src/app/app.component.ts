import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import firebase from "firebase";
import { GooglePlus } from '@ionic-native/google-plus';
import { firebaseConfig } from './credentials';
import { Unsubscribe } from '@firebase/util';
import { DatabaseProvider} from "../providers";

@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class MyApp {
  // rootPage: string='SlidersPage'
  rootPage: any;
  @ViewChild(Nav) nav: Nav;
  constructor(
    platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public googlePlus: GooglePlus,
    public db:DatabaseProvider
  ) {
    firebase.initializeApp(firebaseConfig);
    let self = this;
    const unsubscribe: Unsubscribe = firebase
      .auth()
      .onAuthStateChanged(user => {
        if (user) {
          firebase.database().ref(`/userProfile/${user.uid}/userType`).once("value").then(function (snapshot) {
            /*console.log(snapshot.val());
            console.log(snapshot.val().userType);*/
            if (snapshot.val() === 'customer') {
              self.rootPage = 'MenuPage';
            } else {
              self.rootPage = 'SlidersPage'
            }
          });
        } else {
          self.rootPage = 'SlidersPage';
          unsubscribe();
        }
      });


          platform.ready().then(() => {
           statusBar.styleDefault();
          splashScreen.hide();
        });
  }}
