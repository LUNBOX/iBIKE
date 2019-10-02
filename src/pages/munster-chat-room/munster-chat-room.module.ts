import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MunsterChatRoomPage } from './munster-chat-room';

@NgModule({
  declarations: [
    MunsterChatRoomPage,
  ],
  imports: [
    IonicPageModule.forChild(MunsterChatRoomPage),
  ],
})
export class MunsterChatRoomPageModule {}
