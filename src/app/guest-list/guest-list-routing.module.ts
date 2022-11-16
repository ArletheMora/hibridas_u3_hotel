import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GuestListPage } from './guest-list.page';

const routes: Routes = [
  {
    path: '',
    component: GuestListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GuestListPageRoutingModule {}
