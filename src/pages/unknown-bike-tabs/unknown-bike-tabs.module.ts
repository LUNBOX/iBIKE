import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UnknownBikeTabsPage } from './unknown-bike-tabs';

@NgModule({
  declarations: [
    UnknownBikeTabsPage,
  ],
  imports: [
    IonicPageModule.forChild(UnknownBikeTabsPage),
  ],
})
export class UnknownBikeTabsPageModule {}
