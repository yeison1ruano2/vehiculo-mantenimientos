import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NuevorepuestoPageRoutingModule } from './nuevorepuesto-routing.module';

import { NuevorepuestoPage } from './nuevorepuesto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NuevorepuestoPageRoutingModule
  ],
  declarations: [NuevorepuestoPage]
})
export class NuevorepuestoPageModule {}
