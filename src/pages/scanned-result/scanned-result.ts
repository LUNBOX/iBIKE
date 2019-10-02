import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from "firebase";

@IonicPage({
  segment: 'scanned-results/:count'
})
@Component({
  selector: 'page-scanned-result',
  templateUrl: 'scanned-result.html',
})
export class ScannedResultPage {

  splash = true;
  result : number;
  statement: string;
  results: {};
  attendingEvents: Array<string>;
  tickets: Array<string>;
  myEvents: Array<string>;
  events: Array<string>;

  public eventLists: Array<any>;
  Firstname: string;
  Surname :string;
  email: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.result=this.navParams.get('count');
  }

  ionViewWillEnter() {
    setTimeout(() => this.splash = false, 4000);
    if(this.result>0){

      this.statement = "This bike has been reported as stolen from its owner:"
     
    }
    else{
      this.statement = "This bike has been reported as stolen from its owner:"
     
    }

  }

}
