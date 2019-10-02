import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the UnknownBikeTabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-unknown-bike-tabs',
  templateUrl: 'unknown-bike-tabs.html',
})
export class UnknownBikeTabsPage {
  tab1Root = 'UnknownFoundBikesDisplayPage';
  tab2Root = "SearchUnknownBikesPage";
  myIndex:number;


  constructor(public navCtrl: NavController) {}
}

