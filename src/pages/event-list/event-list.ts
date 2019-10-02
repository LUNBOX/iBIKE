import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { EventProvider } from '../../providers/event/event';

@IonicPage()
@Component({
  selector: 'page-event-list',
  templateUrl: 'event-list.html'
})
export class EventListPage {
  public eventList: Array<any>;

  constructor(
    public navCtrl: NavController,
    public eventProvider: EventProvider
  ) {}

  ionViewWillEnter() {
    this.eventProvider.getEventList().on('value', eventListSnapshot => {
      this.eventList = [];
      eventListSnapshot.forEach(snap => {
        this.eventList.push({
          id: snap.key,
          colour: snap.val().colour,
          name: snap.val().name,
          date: snap.val().date,
          venue: snap.val().venue
        });
        return false;
      });
    });
  }

  goToEventDetail(eventId): void {
    this.navCtrl.push('EventDetailPage', { eventId: eventId });
  }
  goToCreate(): void {
    this.navCtrl.push('EventCreatePage');
  }
  goToCreateFoundBike():void {
    this.navCtrl.push('UnknownBikeCreatePage');
  }
}
