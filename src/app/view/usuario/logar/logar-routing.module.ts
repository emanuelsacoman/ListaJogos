import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LogarPage } from './logar.page';

const routes: Routes = [
  {
    path: '',
    component: LogarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LogarPageRoutingModule {}