import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MapsTabsPage } from './maps-tabs';

@NgModule({
  declarations: [
    MapsTabsPage,
  ],
  imports: [
    IonicPageModule.forChild(MapsTabsPage),
  ],
})
export class MapsTabsPageModule {}
