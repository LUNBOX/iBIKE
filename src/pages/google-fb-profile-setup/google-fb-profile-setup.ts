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


@IonicPage()
@Component({
  selector: 'page-google-fb-profile-setup',
  templateUrl: 'google-fb-profile-setup.html',
})
export class GoogleFbProfileSetupPage {

  public userProfile: any;
  public birthDate: string;
  public FirstContactNumber:number;
  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public authProvider: AuthProvider,
    public profileProvider: ProfileProvider,
    public app: App,
    public toastController: ToastController
  ) {}

  ionViewWillEnter() {
    this.profileProvider.getUserProfile().on('value', userProfileSnapshot => {
      this.userProfile = userProfileSnapshot.val();
      this.birthDate = userProfileSnapshot.val().birthDate;
      this.FirstContactNumber = userProfileSnapshot.val().FirstContactNumber;
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
  updateNumber(FirstContactNumber:number): void {
    if (FirstContactNumber == null){
     alert("Please Input a phone number");
  }
else{

    this.profileProvider.updateNumber(FirstContactNumber);
  }
}
  GoUserHomePage() {
    this.presentToast()
    this.profileProvider.updateUserType("customer");
      this.navCtrl.push('MenuPage');
      

    }
     async presentToast() {
    const toast = await this.toastController.create({
      message: 'Your details have been saved. You can change these in settings',
      duration: 3000
    });
    toast.present();
  }
}
