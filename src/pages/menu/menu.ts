import { Component, ViewChild } from '@angular/core';
import {IonicPage, NavController, NavParams, Nav,ToastController, normalizeURL} from 'ionic-angular';
import { GooglePlus } from '@ionic-native/google-plus';
import { NativeStorage } from '@ionic-native/native-storage';
import { UserModel } from './menu.module';
import {AuthProvider} from "../../providers/auth/auth";
import firebase from "firebase";
import { ProfileProvider } from '../../providers/profile/profile';
import { User } from '@firebase/auth-types';
// import {AndroidPermissions} from "@ionic-native/android-permissions";
import { Reference } from '@firebase/database-types';
import {ImagePicker} from "@ionic-native/image-picker";
import {Crop} from "@ionic-native/crop";
import {FirebaseService} from "../service/firebase.service";
import {Camera} from "@ionic-native/camera";
import {RecordDistancePage} from "../record-distance/record-distance";
import { MapsPage } from "../maps/maps";
@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {
  @ViewChild(Nav) nav: Nav;
	picture: string;
  email: string;
  name: string;
  path: string;
  newImage:any;
  user: UserModel = new UserModel();
	rootPage: any = 'TabsPage';
	public displayName:any;
	data: any;
  subscription: any;
  timeout: any;
  textMessage: string;
  phoneNumber: Reference;
  currentUser: User;
  public userProfile: any;
  public birthDate: string;
  public FirstContactNumber:number;
  public FirstContactNumberResponse:string;
	public b:string;
  public firstName:any;
  public test:any;
  loading: any;
	pages: Array<{ title: string, component: any, index?: number, notab?: boolean,icon:string}>;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public nativeStorage: NativeStorage,public profileProvider: ProfileProvider,public cameraPlugin: Camera,
    public googlePlus: GooglePlus,public authProvider: AuthProvider,
              public imagePicker: ImagePicker,
              public cropService: Crop,
              public toastCtrl: ToastController,
              public firebaseService: FirebaseService) {
		this.pages = [
			{ title: 'Home', component: 'TabsPage', index: 0,icon:'home'},
      { title: 'Accident Protector', component: 'AccidentProtectorSystemPage', notab: true,icon:"logo-whatsapp" },
      { title: 'Bike Maps', component: 'MapsTabsPage',icon:"pin" },
      // { title: 'Infddo', component: 'FirebaseImagePage', index: 1,icon:'home' },
      { title: 'QR', component: "QrTabsPage", index: 1,icon:'barcode' },
      {title: 'Local Weather', component: MapsPage, notab: true,icon: 'partly-sunny'},
      {title: 'Record Your Bike Journey', component: RecordDistancePage, icon: 'md-bicycle'},
      { title: 'Chat Room', component: 'MyTicketsPage',icon:"chatbubbles" },
      {title: 'Unknown bikes found', component: "UnknownBikeTabsPage", icon: 'md-help'},
      { title: 'Calculate Calories', component: 'ActivitytabsPage',icon:"calculator" },
      { title: 'Settings', component: 'SettingsPage',icon:"settings" },

		];
		firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.test = firebase.auth().currentUser.uid
        this.firstName = firebase.database().ref(`/userProfile/${user.uid}/firstName`);
        this.userProfile = firebase.database().ref(`/userProfile/${user.uid}`);
        firebase.database().ref(`/userProfile/${user.uid}`).once('value',(snapshot) => {
          this.FirstContactNumberResponse = snapshot.val().firstName;
          this.email = snapshot.val().email
					this.displayName= this.FirstContactNumberResponse

          

        })
      }
      var ProfilePicture = this.navParams.get("firebase.auth().currentUser.uid");
      firebase.database().ref(`/test`).once('value',(snapshot) => {
        if(snapshot.val()[ProfilePicture]) {
          this.path=snapshot.val()[ProfilePicture];
        }
    });
 
      if(!(this.path)){
          this.path ="assets/img/sport.jpg";
          console.log(this.path);
        }
    })
	}


  ionViewCanEnter(){
    this.nativeStorage.getItem('user')
    .then((data) => {
      this.user = {
        name: data.name,
        email: data.email,
        picture: data.picture
      };
    }, (error) => {
      console.log(error);
    });
      if (this.path!= this.user.picture){
        this.path=this.newImage
      }

		
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

changebacktoOriginalPic(){
  this.path= this.user.picture
}
takeEventPicture(): void {
  this.cameraPlugin.getPicture({
    quality: 95,
    destinationType: this.cameraPlugin.DestinationType.DATA_URL,
    sourceType: this.cameraPlugin.PictureSourceType.PHOTOLIBRARY,
    allowEdit: true,
    encodingType: this.cameraPlugin.EncodingType.PNG,
    targetWidth: 500,
    targetHeight: 500,
    saveToPhotoAlbum: true
  }).then(profilePicture => {
    // Send the picture to Firebase Storage/userProfile/${this.results[text]}`
    const selfieRef = firebase.storage().ref(`test/${firebase.auth().currentUser.uid}`)
    alert(selfieRef);

    selfieRef.putString(profilePicture, 'base64', {contentType: 'image/png'})
      .then(savedProfilePicture => {
        firebase
          .database()
          .ref(`test/${firebase.auth().currentUser.uid}`)
          .set(savedProfilePicture.downloadURL);
          
        this.path = savedProfilePicture.downloadURL;
      });
  });

}
}
