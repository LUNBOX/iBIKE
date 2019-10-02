import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LeinsterChatRoomPage } from './leinster-chat-room';

@NgModule({
  declarations: [
    LeinsterChatRoomPage,
  ],
  imports: [
    IonicPageModule.forChild(LeinsterChatRoomPage),
  ],
})
export class LeinsterChatRoomPageModule {}
