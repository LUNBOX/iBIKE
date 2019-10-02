import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UlsterChatRoomPage } from './ulster-chat-room';

@NgModule({
  declarations: [
    UlsterChatRoomPage,
  ],
  imports: [
    IonicPageModule.forChild(UlsterChatRoomPage),
  ],
})
export class UlsterChatRoomPageModule {}
