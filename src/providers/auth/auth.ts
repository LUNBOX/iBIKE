import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { User } from '@firebase/auth-types';
import {GooglePlus} from '@ionic-native/google-plus';
import {AlertController} from 'ionic-angular';
import {Platform} from "ionic-angular";
@Injectable()
export class AuthProvider {
  constructor(public googlePlus: GooglePlus, public alertCtrl: AlertController, public platform: Platform) {
    console.log('Hello AuthProvider Provider');
  }
  loginUser(email: string, password: string): Promise<User> {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  signupUser(email: string, password: string): Promise<void> {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(newUser => {
        firebase
          .database()
          .ref(`/userProfile/${newUser.uid}/email`)
          .set(email);
      })
      .catch(error => {
        console.error(error);
        throw new Error(error);
      });
  }

  resetPassword(email: string): Promise<void> {
    return firebase.auth().sendPasswordResetEmail(email);
  }

  logoutUser(): Promise<void> {
    const userId: string = firebase.auth().currentUser.uid;
    firebase
      .database()
      .ref(`/userProfile/${userId}`)
      .off();
    return firebase.auth().signOut();
  }
  googleLogin(): Promise<any> {

    return new Promise((resolve, reject) => {
      this.googlePlus.login({
        'webClientId': "621413137785-5q8amq8ekl85me9h92f47d7oebh6j2j9.apps.googleusercontent.com",
        'offline': true
      }).then(res => {
        const googleCredential = firebase.auth.GoogleAuthProvider
          .credential(res.idToken);

        if (this.platform.is('core') || this.platform.is('mobileweb')) {
          firebase.auth().signInWithCredential(googleCredential)
            .then(response => {
              console.log("Firebase success: " + JSON.stringify(response));
              resolve(response)
            });
        }
        else {
          firebase.auth().signInWithRedirect(googleCredential)
            .then(response => {
              console.log("Firebase success: " + JSON.stringify(response));
              resolve(response)
            });
        }

      }, err => {
        console.error("Error: ", err)
        reject(err);
      });
    });
  }
}
