import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PurchaseTicketsPage } from './purchase-tickets';

@NgModule({
  declarations: [
    PurchaseTicketsPage,
  ],
  imports: [
    IonicPageModule.forChild(PurchaseTicketsPage),
  ],
})
export class PurchaseTicketsPageModule {}
