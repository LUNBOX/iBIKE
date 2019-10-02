import { Component } from '@angular/core';
import { IonicPage, NavController} from 'ionic-angular';
import { GoalsPage } from '../goals/goals';



@IonicPage()
@Component({
  selector: 'page-activitytabs',
  templateUrl: 'activitytabs.html',
})
export class ActivitytabsPage {
  tab1Root = 'ActivitydetailsPage';
  tab2Root = 'ActivityPage';
  tab3Root = GoalsPage;

  myIndex:number;

  constructor(public navCtrl: NavController) {}



}