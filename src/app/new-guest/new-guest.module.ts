import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewGuestPageRoutingModule } from './new-guest-routing.module';

import { NewGuestPage } from './new-guest.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewGuestPageRoutingModule
  ],
  declarations: [NewGuestPage]
})
export class NewGuestPageModule {}
