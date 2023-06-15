import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'vehiculos',
    loadChildren: () => import('./vehiculos/vehiculos.module').then( m => m.VehiculosPageModule)
  },
  {
    path: 'repuestos',
    loadChildren: () => import('./repuestos/repuestos.module').then( m => m.RepuestosPageModule)
  },
  {
    path: 'nuevovehiculo',
    loadChildren: () => import('./nuevovehiculo/nuevovehiculo.module').then( m => m.NuevovehiculoPageModule)
  },
  {
    path: 'editarvehiculo',
    loadChildren: () => import('./editarvehiculo/editarvehiculo.module').then( m => m.EditarvehiculoPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
