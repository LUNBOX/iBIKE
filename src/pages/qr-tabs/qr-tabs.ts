import { Component } from '@angular/core';
import { IonicPage, NavController} from 'ionic-angular';
import { QrPage } from '../qr/qr';

/**
 * Generated class for the QrTabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-qr-tabs',
  templateUrl: 'qr-tabs.html',
})
export class QrTabsPage {


  tab1Root = QrPage;
  // tab2Root = RecordDistancePage;
  tab2Root = "QrScannerPage";
  myIndex:number;


  constructor(public navCtrl: NavController) {}
}
