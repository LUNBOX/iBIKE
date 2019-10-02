import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ScannerTestPage } from './scanner-test';

@NgModule({
  declarations: [
    ScannerTestPage,
  ],
  imports: [
    IonicPageModule.forChild(ScannerTestPage),
  ],
})
export class ScannerTestPageModule {}
