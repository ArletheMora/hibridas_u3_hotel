import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewGuestPageRoutingModule } from './new-guest-routing.module';

import { NewGuestPage } from './new-guest.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    NewGuestPageRoutingModule
  ],
  declarations: [NewGuestPage]
})
export class NewGuestPageModule {}
