import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NuevovehiculoPageRoutingModule } from './nuevovehiculo-routing.module';

import { NuevovehiculoPage } from './nuevovehiculo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NuevovehiculoPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [NuevovehiculoPage],
})
export class NuevovehiculoPageModule {}
