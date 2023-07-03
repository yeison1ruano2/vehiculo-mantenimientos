import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./tabs/tabs.module').then((m) => m.TabsPageModule),
  },
  {
    path: 'vehiculos',
    loadChildren: () =>
      import('./vehiculos/vehiculos.module').then((m) => m.VehiculosPageModule),
  },
  {
    path: 'repuestos',
    loadChildren: () =>
      import('./repuestos/repuestos.module').then((m) => m.RepuestosPageModule),
  },
  {
    path: 'nuevovehiculo',
    loadChildren: () =>
      import('./nuevovehiculo/nuevovehiculo.module').then(
        (m) => m.NuevovehiculoPageModule
      ),
  },
  {
    path: 'editarvehiculo',
    loadChildren: () =>
      import('./editarvehiculo/editarvehiculo.module').then(
        (m) => m.EditarvehiculoPageModule
      ),
  },
  {
    path: 'mantenimientos',
    loadChildren: () =>
      import('./mantenimientos/mantenimientos.module').then(
        (m) => m.MantenimientosPageModule
      ),
  },
  {
    path: 'nuevomantenimiento',
    loadChildren: () => import('./nuevomantenimiento/nuevomantenimiento.module').then( m => m.NuevomantenimientoPageModule)
  },
  {
    path: 'editarmantenimiento',
    loadChildren: () => import('./editarmantenimiento/editarmantenimiento.module').then( m => m.EditarmantenimientoPageModule)
  },
  {
    path: 'nuevorepuesto',
    loadChildren: () => import('./nuevorepuesto/nuevorepuesto.module').then( m => m.NuevorepuestoPageModule)
  },
  {
    path: 'editarrepuesto',
    loadChildren: () => import('./editarrepuesto/editarrepuesto.module').then( m => m.EditarrepuestoPageModule)
  },
  {
    path: 'seleccionarrepuestos',
    loadChildren: () => import('./seleccionarrepuestos/seleccionarrepuestos.module').then( m => m.SeleccionarrepuestosPageModule)
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
