import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DublinChatRoomPage } from './dublin-chat-room';

@NgModule({
  declarations: [
    DublinChatRoomPage,
  ],
  imports: [
    IonicPageModule.forChild(DublinChatRoomPage),
  ],
})
export class DublinChatRoomPageModule {}
