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
