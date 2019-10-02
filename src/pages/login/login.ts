import { Component } from '@angular/core';
import {
  AlertController,
  IonicPage,
  Loading,
  LoadingController,
  NavController,
  NavParams,
} from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailValidator } from '../../validators/email';
import { AuthProvider } from '../../providers/auth/auth';
import firebase from "firebase";
import { GooglePlus } from '@ionic-native/google-plus';
import {NativeStorage} from "@ionic-native/native-storage";
import { Facebook } from "@ionic-native/facebook";


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  splash = true;
  public loginForm: FormGroup;
  public loading: Loading;


  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public authProvider: AuthProvider,
    public navParams: NavParams,
    public nativeStorage: NativeStorage,
    public googlePlus: GooglePlus,
    public facebook: Facebook,

    formBuilder: FormBuilder
  ) {
    this.loginForm = formBuilder.group({
      email: [
        '',
        Validators.compose([Validators.required, EmailValidator.isValid])
      ],
      password: [
        '',
        Validators.compose([Validators.required, Validators.minLength(6)])
      ]
    });
  }
  ionViewDidLoad(){
    console.log('ionViewDidLoad LoginPage');
    setTimeout(() => {
      this.splash = false;
    }, 4000);}


  goToSignup(): void {
    this.navCtrl.push('SignupPage');
  }
  goToLoginWithEmailPage(): void {
    this.navCtrl.push('LoginWithEmailPage');
  }

    googleLogin(): Promise<any> {
      return new Promise((resolve, reject) => { 
          this.googlePlus.login({
            // 'scopes': '', // optional, space-separated list of scopes, If not included or empty, defaults to `profile` and `email`.
           'webClientId': '621413137785-5q8amq8ekl85me9h92f47d7oebh6j2j9.apps.googleusercontent.com', // optional clientId of your Web application from Credentials settings of your project - On Android, this MUST be included to get an idToken. On iOS, it is not required.
           'offline': true
          }).then( res => {
                  const googleCredential = firebase.auth.GoogleAuthProvider
                      .credential(res.idToken);
                  firebase.auth().signInWithCredential(googleCredential)
                .then( response => {
                  firebase
              .database()
              .ref(`/userProfile/${response.uid}/email`)
              .set(response.email);
                    console.log("Firebase success: " + JSON.stringify(response));
                    resolve(response)
                    this.navCtrl.push('GoogleFbProfileSetupPage');
                });
          }, err => {
              console.error("Error: ", err)
              reject(err);
          });
        });
        }


      
        facebookLogin(): Promise<any> {
          return this.facebook.login(['email'])
            .then( response => {
              const facebookCredential = firebase.auth.FacebookAuthProvider
                .credential(response.authResponse.accessToken);
      
              firebase.auth().signInWithCredential(facebookCredential)
                .then( success => {
                  console.log("Firebase success: " + JSON.stringify(success));
                  firebase
                    .database()
                    .ref(`/userProfile/${success.uid}/email`)
                    .set(success.email);
                  console.log("Firebase success: " + JSON.stringify(success));
                  this.navCtrl.push('GoogleFbProfileSetupPage');
                });
      
            }).catch((error) => { console.log(error) });
        }
      }
      


