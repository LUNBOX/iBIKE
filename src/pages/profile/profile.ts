import { Component } from '@angular/core';
import {
  Alert,
  AlertController,
  IonicPage,
  NavController,
  ToastController
} from 'ionic-angular';
import { ProfileProvider } from '../../providers/profile/profile';
import { AuthProvider } from '../../providers/auth/auth';
import {App} from 'ionic-angular';
import firebase from "firebase";
import 'rxjs/add/operator/first';
import { Reference } from '@firebase/database-types';
import { User } from '@firebase/auth-types';
@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {
  public userProfile: any;
  public birthDate: string;
  currentUser: User;
  userRef: Reference;
  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public authProvider: AuthProvider,
    public profileProvider: ProfileProvider,
    public app: App,
    public toastController:ToastController
  ) {}

  ionViewWillEnter() {
    this.profileProvider.getUserProfile().on('value', userProfileSnapshot => {
      this.userProfile = userProfileSnapshot.val();
      this.birthDate = userProfileSnapshot.val().birthDate;
    });
  }

  updateName(): void {
    const alert: Alert = this.alertCtrl.create({
      message: 'Your first name & last name',
      inputs: [
        {
          name: 'firstName',
          placeholder: 'Your first name',
          value: this.userProfile.firstName
        },
        {
          name: 'lastName',
          placeholder: 'Your last name',
          value: this.userProfile.lastName
        }
      ],
      buttons: [
        { text: 'Cancel' },
        {
          text: 'Save',
          handler: data => {
            this.profileProvider.updateName(data.firstName, data.lastName);
          }
        }
      ]
    });
    alert.present();
  }

  updateDOB(birthDate: string): void {
    this.profileProvider.updateDOB(birthDate);
  }

  updateEmail(): void {
    let alert: Alert = this.alertCtrl.create({
      inputs: [
        { name: 'newEmail', placeholder: 'Your new email' },
        { name: 'password', placeholder: 'Your password', type: 'password' }
      ],
      buttons: [
        { text: 'Cancel' },
        {
          text: 'Save',
          handler: data => {
            this.profileProvider
              .updateEmail(data.newEmail, data.password)
              .then(() => {
                console.log('Email Changed Successfully');
              })
              .catch(error => {
                console.log('ERROR: ' + error.message);
              });
          }
        }
      ]
    });
    alert.present();
  }
  
    updateNumber(FirstContactNumber:number): void {
      if (isNaN(FirstContactNumber))
      alert("Please Input a valid number")
      else{
      this.profileProvider.updateNumber(FirstContactNumber);
      }
  }
  updatePassword(): void {
    let alert: Alert = this.alertCtrl.create({
      inputs: [
        { name: 'newPassword', placeholder: 'New password', type: 'password' },
        { name: 'oldPassword', placeholder: 'Old password', type: 'password' }
      ],
      buttons: [
        { text: 'Cancel' },
        {
          text: 'Save',
          handler: data => {
            this.profileProvider.updatePassword(
              data.newPassword,
              data.oldPassword
            );
          }
        }
      ]
    });
    alert.present();
  }
  GoToDelete() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.currentUser = user;
            this.userRef = firebase.database().ref(`/userProfile/${user.uid}/`);
        //     // this.userProfile = firebase.database().ref(`/userProfile/${user.uid}`);
        const confirm = this.alertCtrl.create({
          title: 'iBIKE Delete account',
          message: 'Are you sure you want to delete your account',
          buttons: [
            {
              text: 'No',
              handler: () => {
                console.log('Disagree clicked');
               
              }
            },
            {
              text: 'Yes',
              handler: () => {
                this.userRef.remove();
                this.currentUser.delete();
                this.app.getRootNav().setRoot('LoginPage');
                this.deleteToast();
                // this.afAuth.authState.first().subscribe((authState) => {  authState.delete()
                //                 .then(_ =>  this.navCtrl.push('LoginPage'))}) right way to delete but if looged in long time doesnt work.
                console.log('Agree clicked');
              }
            }
          ]
        });
        confirm.present();
      }
    
    // }
    //     this.currentUser = user;
    //     this.userRef = firebase.database().ref(`/userProfile/${user.uid}/`);
    //     // this.userProfile = firebase.database().ref(`/userProfile/${user.uid}`);
    //     const alert = this.alertCtrl.create({
    //       title: 'iBIKE',
    //       subTitle: 'Are you sure you want to delete your account',
    //       buttons: [{
    //         text: 'Disagree',
    //         handler: () => {
    //           console.log('Disagree clicked');
    //           alert.dismiss();
    //         }
    //       },
    //         {
    //           text: 'Agree',
    //           handler: () => {
    //             alert.dismiss();
    //             this.userRef.remove();
    //             this.currentUser.delete();
    //             this.afAuth.authState.first().subscribe((authState) => {  authState.delete()
    //               .then(_ =>  this.navCtrl.push('LoginPage'))})
    //             console.log('Agree clicked');
    //           }
    //         }
    //       ]
        });
   
   
/*  GoUserHomePage() {
    this.navCtrl.push(TabsPage);

  }
//changetouser
  GoEventHomePage() {
    this.app.getRootNav().setRoot('EventHomePage');

  }*/
}
async deleteToast() {
  const toast = await this.toastController.create({
    message: 'Your account has been deleted',
    duration: 2000
  });
  toast.present();
}}
