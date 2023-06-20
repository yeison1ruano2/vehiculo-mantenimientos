import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'vehiculos',
        loadChildren: () =>
          import('../vehiculos/vehiculos.module').then(
            (m) => m.VehiculosPageModule
          ),
      },
      {
        path: '',
        redirectTo: '/tabs/vehiculos',
        pathMatch: 'full',
      },
      {
        path: 'repuestos',
        loadChildren: () =>
          import('../repuestos/repuestos.module').then(
            (m) => m.RepuestosPageModule
          ),
      },
      {
        path: 'nuevovehiculo',
        loadChildren: () =>
          import('../nuevovehiculo/nuevovehiculo.module').then(
            (m) => m.NuevovehiculoPageModule
          ),
      },
      {
        path: 'editarvehiculo',
        loadChildren: () =>
          import('../editarvehiculo/editarvehiculo.module').then(
            (m) => m.EditarvehiculoPageModule
          ),
      },
      {
        path: 'mantenimientos',
        loadChildren: () =>
          import('../mantenimientos/mantenimientos.module').then(
            (m) => m.MantenimientosPageModule
          ),
      },
      {
        path: 'nuevomantenimiento',
        loadChildren: () =>
          import('../nuevomantenimiento/nuevomantenimiento.module').then(
            (m) => m.NuevomantenimientoPageModule
          ),
      },
      {
        path: 'editarmantenimiento',
        loadChildren: () =>
          import('../editarmantenimiento/editarmantenimiento.module').then(
            (m) => m.EditarmantenimientoPageModule
          ),
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/vehiculos',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
