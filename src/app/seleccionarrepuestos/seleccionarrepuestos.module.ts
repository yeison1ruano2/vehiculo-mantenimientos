import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SeleccionarrepuestosPageRoutingModule } from './seleccionarrepuestos-routing.module';

import { SeleccionarrepuestosPage } from './seleccionarrepuestos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SeleccionarrepuestosPageRoutingModule
  ],
  declarations: [SeleccionarrepuestosPage]
})
export class SeleccionarrepuestosPageModule {}
