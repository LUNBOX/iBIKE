import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
@IonicPage()
@Component({
  selector: 'page-my-tickets',
  templateUrl: 'my-tickets.html',
})
export class MyTicketsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }


  ionViewWillEnter() {
  }
  GoToDublinChatRoom(): void {
    this.navCtrl.push('DublinChatRoomPage');
  }
  GoToUlsterChatRoom(): void {
    this.navCtrl.push('UlsterChatRoomPage');
  }
  GoToC(): void {
    this.navCtrl.push('ConnachtChatRoomPage');
  }
  GoToMunsterChatRoom(): void {
    this.navCtrl.push('MunsterChatRoomPage');
  }
  GoToLeinsterChatRoom(): void {
    this.navCtrl.push('LeinsterChatRoomPage');
  }

}
