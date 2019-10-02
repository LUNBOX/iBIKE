import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WelcomeSignupPage } from './welcome-signup';

@NgModule({
  declarations: [
    WelcomeSignupPage,
  ],
  imports: [
    IonicPageModule.forChild(WelcomeSignupPage),
  ],
})
export class WelcomeSignupPageModule {}
