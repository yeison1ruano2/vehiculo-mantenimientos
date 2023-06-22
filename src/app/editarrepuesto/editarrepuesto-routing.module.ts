import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditarrepuestoPage } from './editarrepuesto.page';

const routes: Routes = [
  {
    path: '',
    component: EditarrepuestoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditarrepuestoPageRoutingModule {}
