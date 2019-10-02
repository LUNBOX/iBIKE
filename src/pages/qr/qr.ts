import { Component } from '@angular/core';
import {ProfileProvider} from "../../providers/profile/profile";
import { NavController} from "ionic-angular";



@Component({
  selector: 'page-qr',
  templateUrl: 'qr.html',
})
export class QrPage {

 /*user = {} as User;*/
  createdCode = null;
  /*scannedCode = null;*/


  constructor(public profileProvider: ProfileProvider,public navCtrl: NavController) {
  }

  ionViewDidEnter() {

    this.createdCode = this.profileProvider.currentUser.uid;

  }


}









