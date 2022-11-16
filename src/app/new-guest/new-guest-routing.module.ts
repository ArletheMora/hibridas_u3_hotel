import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewGuestPage } from './new-guest.page';

const routes: Routes = [
  {
    path: '',
    component: NewGuestPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewGuestPageRoutingModule {}
