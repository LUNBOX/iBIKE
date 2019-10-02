import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ProfileProvider} from "../../providers/profile/profile";
import { Reference } from '@firebase/database-types';
//import {UserHomePage} from "../user-home/user-home";

/**
 * Generated class for the WelcomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({

  selector: 'page-welcome-signup',
  templateUrl: 'welcome-signup.html',

})
export class WelcomeSignupPage {
  userProfile: Reference;
  constructor(public navCtrl: NavController, public navParams: NavParams,public profileProvider: ProfileProvider,) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomePage');
  }
  GoCustomerProfilePage() {
    this.navCtrl.push('UserProfilePage');
    this.profileProvider.updateUserType("customer");

  }
  GoEventProfilePage() {

    this.navCtrl.push('EventProfilePage');
    this.profileProvider.updateUserType("eventorganiser");


  }

 /* updateUserType(userType: string): void {
    this.profileProvider.updateUserType(userType);
  }*/

}


