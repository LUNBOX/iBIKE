import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConfirmBikeStolenPage } from './confirm-bike-stolen';

@NgModule({
  declarations: [
    ConfirmBikeStolenPage,
  ],
  imports: [
    IonicPageModule.forChild(ConfirmBikeStolenPage),
  ],
})
export class ConfirmBikeStolenPageModule {}
