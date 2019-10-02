import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchUnknownBikesPage } from './search-unknown-bikes';

@NgModule({
  declarations: [
    SearchUnknownBikesPage,
  ],
  imports: [
    IonicPageModule.forChild(SearchUnknownBikesPage),
  ],
})
export class SearchUnknownBikesPageModule {}
