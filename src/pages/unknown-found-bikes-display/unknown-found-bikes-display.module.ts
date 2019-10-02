import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UnknownFoundBikesDisplayPage } from './unknown-found-bikes-display';

@NgModule({
  declarations: [
    UnknownFoundBikesDisplayPage,
  ],
  imports: [
    IonicPageModule.forChild(UnknownFoundBikesDisplayPage),
  ],
})
export class UnknownFoundBikesDisplayPageModule {}
