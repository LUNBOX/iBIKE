import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserEventDetailsPage } from './user-event-details';

@NgModule({
  declarations: [
    UserEventDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(UserEventDetailsPage),
  ],
})
export class UserEventDetailsPageModule {}
