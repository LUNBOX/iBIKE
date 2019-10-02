import { Component } from '@angular/core';
import { IonicPage, NavController} from 'ionic-angular';
import { SettingsService } from "../../app/settings.service";
import { CalorieCalculatorService } from '../../app/calorie.calculator.service';
import { GoalsPage } from "../goals/goals";


@IonicPage()
@Component({
  selector: 'page-activitydetails',
  templateUrl: 'activitydetails.html',
})
export class ActivitydetailsPage {

  ages = Array(83).fill(0).map((x,i) => i+18);

  feet = Array(4).fill(4).map((x,i) => i+4);
  inches = Array(12).fill(0).map((x,i) => i);

  cms = Array(121).fill(121).map((x,i) => i+121);

  weights = Array(326).fill(75).map((x,i) => i+75);

  kgs = Array(148).fill(34).map((x,i) => i+34);

  getFeetAndInches() {
      this.calorieCalculatorService.user.iHeightFeet = Math.floor(this.calorieCalculatorService.user.iHeight / 12);
      this.calorieCalculatorService.user.iHeightInches = this.calorieCalculatorService.user.iHeight % 12;
      this.goalsPage.updateCalories();
  }

  /* update the user */

  updateDirectly() {
      this.calorieCalculatorService.setUser();
      this.goalsPage.updateCalories();
  }


  /* update the height */

  updateHeight() {

      const feety = Number.parseInt(this.calorieCalculatorService.user.iHeightFeet + '', 10);
      const inchy = Number.parseInt(this.calorieCalculatorService.user.iHeightInches + '', 10);

      if (this.settingsService.settings.height_setting == 'imperial') {
          this.calorieCalculatorService.user.iHeight = (12 * feety) + inchy;
          this.calorieCalculatorService.user.mHeight = Math.round(this.calorieCalculatorService.user.iHeight * 2.54);
      } else if (this.settingsService.settings.height_setting == 'metric') {
          this.calorieCalculatorService.user.iHeight = Math.round(this.calorieCalculatorService.user.mHeight / 2.54);
      }

      this.getFeetAndInches();

      // make calorieCalculatorService save new results
      this.calorieCalculatorService.setUser();
      this.goalsPage.updateCalories();
  }


  /* update the weight */

  updateWeight() {

      // first make them strings just in case
      const iWeighty = this.calorieCalculatorService.user.iWeight + '';
      const mWeighty = this.calorieCalculatorService.user.mWeight + '';

      // zero out the old values
      this.calorieCalculatorService.user.iWeight = 0;
      this.calorieCalculatorService.user.mWeight = 0;

      if (this.settingsService.settings.weight_setting == 'imperial') {
          this.calorieCalculatorService.user.iWeight = parseInt(iWeighty, 10);
          this.calorieCalculatorService.user.mWeight = Math.round(this.calorieCalculatorService.user.iWeight / 2.2);
      } else if (this.settingsService.settings.weight_setting == 'metric') {
          this.calorieCalculatorService.user.mWeight = parseInt(mWeighty, 10);
          this.calorieCalculatorService.user.iWeight = Math.round(this.calorieCalculatorService.user.mWeight * 2.2);
      }

      // make calorieCalculatorService save new results
      this.calorieCalculatorService.setUser();
      this.goalsPage.updateCalories();

  }


  /* constructor */

  constructor(
      public navCtrl: NavController,
      private settingsService: SettingsService,
      private calorieCalculatorService: CalorieCalculatorService,
      private goalsPage: GoalsPage) {
  }

  ngOnInit() {
      this.calorieCalculatorService.getUser().then((value) => {
          this.calorieCalculatorService.user.iHeight = value.iHeight;
          this.getFeetAndInches();
      });
  }

}