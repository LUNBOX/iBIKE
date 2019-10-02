import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GoogleFbProfileSetupPage } from './google-fb-profile-setup';

@NgModule({
  declarations: [
    GoogleFbProfileSetupPage,
  ],
  imports: [
    IonicPageModule.forChild(GoogleFbProfileSetupPage),
  ],
})
export class GoogleFbProfileSetupPageModule {}
