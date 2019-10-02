import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AccidentProtectorSystemPage } from './accident-protector-system';

@NgModule({
  declarations: [
    AccidentProtectorSystemPage,
  ],
  imports: [
    IonicPageModule.forChild(AccidentProtectorSystemPage),
  ],
})
export class AccidentProtectorSystemPageModule {}
