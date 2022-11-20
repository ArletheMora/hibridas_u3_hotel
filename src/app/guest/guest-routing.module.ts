import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GuestPage } from './guest.page';

const routes: Routes = [
  {
    path: '',
    component: GuestPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GuestPageRoutingModule {}
