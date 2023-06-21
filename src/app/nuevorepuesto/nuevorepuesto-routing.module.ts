import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NuevorepuestoPage } from './nuevorepuesto.page';

const routes: Routes = [
  {
    path: '',
    component: NuevorepuestoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NuevorepuestoPageRoutingModule {}
