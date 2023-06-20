import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarmantenimientoPageRoutingModule } from './editarmantenimiento-routing.module';

import { EditarmantenimientoPage } from './editarmantenimiento.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarmantenimientoPageRoutingModule
  ],
  declarations: [EditarmantenimientoPage]
})
export class EditarmantenimientoPageModule {}
