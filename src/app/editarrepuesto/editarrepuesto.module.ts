import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarrepuestoPageRoutingModule } from './editarrepuesto-routing.module';

import { EditarrepuestoPage } from './editarrepuesto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarrepuestoPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [EditarrepuestoPage],
})
export class EditarrepuestoPageModule {}
