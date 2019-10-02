import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';


@Component({
  selector: 'page-record-distance',
  templateUrl: 'record-distance.html',
})
export class RecordDistancePage {

  constructor(public navCtrl: NavController) { }

  navigateToCalculationPage()
  {
    this.navCtrl.push('calculation-page');
  }

  navigateToHistoryPage()
  {
    this.navCtrl.push('history-page');
  }

}

