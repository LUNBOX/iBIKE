import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Camera } from '@ionic-native/camera';
import { MyApp } from './app.component';
import { AuthProvider } from '../providers/auth/auth';
import { EventProvider } from '../providers/event/event';
import { ProfileProvider } from '../providers/profile/profile';
import { NgxQRCodeModule } from "ngx-qrcode2";
import { QrPage } from "../pages/qr/qr";
import { FormsModule } from "@angular/forms";
import { BarcodeScanner } from "@ionic-native/barcode-scanner";
import { GooglePlus } from '@ionic-native/google-plus';
import { NativeStorage } from '@ionic-native/native-storage';
import 'firebase/storage'
import { DistanceCalculationProvider } from '../providers/distance-calculation/distance-calculation';
import { DigitConvertorProvider } from '../providers/digit-convertor/digit-convertor';
import { DatabaseProvider } from '../providers/database/database';
import { UnitConvertorProvider } from '../providers/unit-convertor/unit-convertor';
import { MapProvider } from '../providers/map/map';
import { SQLite } from "@ionic-native/sqlite";
import { OpenNativeSettings } from "@ionic-native/open-native-settings";
import { Geolocation } from "@ionic-native/geolocation";
import { Insomnia } from "@ionic-native/insomnia";
import { Diagnostic } from "@ionic-native/diagnostic";
import { Facebook } from "@ionic-native/facebook";
import { PlacesPage } from "../pages/places/places";
import { DeviceMotion } from "@ionic-native/device-motion";
import { MapsPage } from "../pages/maps/maps";
import { AndroidPermissions } from "@ionic-native/android-permissions";
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { Crop } from '@ionic-native/crop';
import { FirebaseService } from '../pages/service/firebase.service';
import {ImagePicker} from "@ionic-native/image-picker";
import {RecordDistancePage} from "../pages/record-distance/record-distance";
import { AngularFireAuth } from 'angularfire2/auth';
import { GoalsPage } from '../pages/goals/goals';
import { CalorieCalculatorService } from "./calorie.calculator.service";
import { SettingsService } from "./settings.service";
import { IonicStorageModule } from "@ionic/storage"
// import { BackgroundMode } from '@ionic-native/background-mode';
const firebaseConfig = {
  apiKey: "AIzaSyADKS431yVVCeywX74w1gGPaA0xkJiXSkY",
  authDomain: "test-project-6c3b1.firebaseapp.com",
  databaseURL: "https://test-project-6c3b1.firebaseio.com",
  projectId: "test-project-6c3b1",
  storageBucket: "test-project-6c3b1.appspot.com",
  messagingSenderId: "621413137785"
};
@NgModule({
  // NOTE: KEEP QRPAGE IN DECLARATION AND IMPORTS //maybe take out testmapstabs
  declarations: [MyApp,GoalsPage,MapsPage,QrPage, RecordDistancePage, PlacesPage],
  imports: [BrowserModule, IonicModule.forRoot(MyApp), NgxQRCodeModule, FormsModule, AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,IonicStorageModule.forRoot()],
  bootstrap: [IonicApp],
  entryComponents: [MyApp,RecordDistancePage,  GoalsPage,QrPage, MapsPage, PlacesPage],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    GooglePlus,
    NativeStorage,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AuthProvider,
    EventProvider,
    ProfileProvider,
    BarcodeScanner,
    Geolocation,
    SQLite,
    MapProvider,
    UnitConvertorProvider,
    DatabaseProvider,
    DigitConvertorProvider,
    DistanceCalculationProvider,
    Insomnia,
    Diagnostic,
    OpenNativeSettings,
    Facebook,
    DeviceMotion,
    AndroidPermissions,
    Crop,
    ImagePicker,
    AngularFireAuth,
    FirebaseService,
    SettingsService,
    CalorieCalculatorService,
    // BackgroundMode








  ]
})
export class AppModule {}

