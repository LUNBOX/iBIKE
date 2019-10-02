import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ScannedResultPage } from './scanned-result';

@NgModule({
  declarations: [
    ScannedResultPage,
  ],
  imports: [
    IonicPageModule.forChild(ScannedResultPage),
  ],
})
export class ScannedResultPageModule {}
