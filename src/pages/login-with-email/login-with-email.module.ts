import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginWithEmailPage } from './login-with-email';

@NgModule({
  declarations: [
    LoginWithEmailPage,
  ],
  imports: [
    IonicPageModule.forChild(LoginWithEmailPage),
  ],
})
export class LoginWithEmailPageModule {}
