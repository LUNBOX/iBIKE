import { Component } from '@angular/core';
import { IonicPage, NavController} from 'ionic-angular';
import {PlacesPage} from "../places/places";
import { MapsPage } from "../maps/maps";


/**
 * Generated class for the MapsTabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-maps-tabs',
  templateUrl: 'maps-tabs.html',
})
export class MapsTabsPage {

  
 

  tab1Root = MapsPage;
  tab2Root = PlacesPage;
  myIndex:number;


  constructor(public navCtrl: NavController) {}
}
