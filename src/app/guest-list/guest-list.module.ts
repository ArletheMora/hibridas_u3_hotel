import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GuestListPageRoutingModule } from './guest-list-routing.module';

import { GuestListPage } from './guest-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GuestListPageRoutingModule
  ],
  declarations: [GuestListPage]
})
export class GuestListPageModule {}
