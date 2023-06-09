import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RepuestosPageRoutingModule } from './repuestos-routing.module';

import { RepuestosPage } from './repuestos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RepuestosPageRoutingModule,
  ],
  declarations: [RepuestosPage],
})
export class RepuestosPageModule {}
