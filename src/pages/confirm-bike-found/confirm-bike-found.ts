import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EventProvider } from '../../providers/event/event';


@IonicPage()
@Component({
  selector: 'page-confirm-bike-found',
  templateUrl: 'confirm-bike-found.html',
})
export class ConfirmBikeFoundPage {
  public currentEvent: any = {};
  constructor(public navCtrl: NavController, public navParams: NavParams,public eventProvider: EventProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfirmBikeFoundPage');
  }
  updateBikebeenfound(eventId: string){
    this.eventProvider.updateFoundStatus(this.navParams.get('eventId'));
    alert('You have confirmed bike as been found. It will be removed from everyone seeing it now');
    this.navCtrl.push('EventListPage' , { eventId: eventId });
  }

}
