import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EventProvider } from '../../providers/event/event';
/**
 * Generated class for the ConfirmBikeStolenPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-confirm-bike-stolen',
  templateUrl: 'confirm-bike-stolen.html',
})
export class ConfirmBikeStolenPage {
  public currentEvent: any = {};
  path: string;
  pathToPicture: string;
  constructor(public navCtrl: NavController, public navParams: NavParams,public eventProvider: EventProvider) {
  }

  ionViewWillEnter() {

    this.eventProvider

      .getEventDetail(this.navParams.get('eventId'))
      .on('value', eventSnapshot => {
        this.currentEvent = eventSnapshot.val();
        this.currentEvent.id = eventSnapshot.key;
        this.pathToPicture = eventSnapshot.val().colour;
      });
  }

updateStolenStatus(eventId: string){
  this.eventProvider.updateStolenStatus(this.navParams.get('eventId'));
   this.navCtrl.push('EventListPage' , { eventId: eventId });
  }
  // updateStolenStatus(stolenStatus:string){
  //   return this.stolenStatus.update({stolenStatus});
  // };

}
