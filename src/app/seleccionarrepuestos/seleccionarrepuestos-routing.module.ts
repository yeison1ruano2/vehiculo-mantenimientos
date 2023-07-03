import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SeleccionarrepuestosPage } from './seleccionarrepuestos.page';

const routes: Routes = [
  {
    path: '',
    component: SeleccionarrepuestosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SeleccionarrepuestosPageRoutingModule {}
