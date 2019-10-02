import { Component } from '@angular/core';
import {App, IonicPage, NavController} from 'ionic-angular';
//import {Welcome} from "../welcome/welcome";
import {AuthProvider} from "../../providers/auth/auth";
import { NativeStorage } from '@ionic-native/native-storage';
import { GooglePlus } from '@ionic-native/google-plus';
import 'rxjs/add/operator/first';


@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  constructor(public navCtrl: NavController,public authProvider: AuthProvider,public app: App, public nativeStorage: NativeStorage, public googlePlus: GooglePlus) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

  GoUserLogOut(): void {
    this.authProvider.logoutUser().then(() => {
      this.app.getRootNav().setRoot('LoginPage');
    });
  }
  doGoogleLogout(){
    let nav = this.navCtrl;
    this.googlePlus.logout()
      .then((response) => {
        this.nativeStorage.remove('user');
        nav.push('LoginPage');
      },(error) => {
        console.log(error);
      })
  }

  GoToPrivacyPolicy(){
    this.navCtrl.push('PrivacyPolicyPage');
  }
  GoToAbout() {

    this.navCtrl.push('AboutPage');

  }
  GoToFaq(){
    this.navCtrl.push('FaqPage');//testsms
  }
  goToProfile(): void {
    this.navCtrl.push('ProfilePage');
  }
  GoToContact(){
    this.navCtrl.push('ContactPage');
    //this.navCtrl.push('SmsPage');
  }
  goToCreate(): void {
    this.navCtrl.push('EventCreatePage');
  }
  goToList(): void {
    this.navCtrl.push('EventListPage');
  }
  GoToQRScanner(): void {
    this.navCtrl.push('ScannerTestPage');
  }
  GoToeventlist(): void {
    this.navCtrl.push('EventListPage');
  }
  gotoRecordDistance(): void {
    this.navCtrl.push('RecordDistancePage');
  }
}
