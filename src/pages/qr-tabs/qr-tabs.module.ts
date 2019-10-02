import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QrTabsPage } from './qr-tabs';

@NgModule({
  declarations: [
    QrTabsPage,
  ],
  imports: [
    IonicPageModule.forChild(QrTabsPage),
  ],
})
export class QrTabsPageModule {}
