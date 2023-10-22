import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductsComponent } from './products/products.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { CoupensComponent } from './coupens/coupens.component';
import { SettingsComponent } from './settings/settings.component';

import { SistemaFormComponent } from './features/sistema/sistema-form/sistema-form.component';
import { SistemaTableComponent } from './features/sistema/sistema-table/sistema-table.component';
import { SistemaFormUpdateComponent } from './features/sistema/sistema-form-update/sistema-form-update.component';
import { CategoriaFormComponent } from './features/categoria/categoria-form/categoria-form.component';
import { CategoriaTableComponent } from './features/categoria/categoria-table/categoria-table.component';
import { CategoriaFormUpdateComponent } from './features/categoria/categoria-form-update/categoria-form-update.component';
import { DespesaFormComponent } from './features/despesa/despesa-form/despesa-form.component';
import { DespesaTableComponent } from './features/despesa/despesa-table/despesa-table.component';
import { DespesaFormUpdateComponent } from './features/despesa/despesa-form-update/despesa-form-update.component';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path:'login',component:LoginComponent}, 
  { path:'',component:LoginComponent},
  { path: 'dashboard', component: DashboardComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'statistics', component: StatisticsComponent },
  { path: 'coupens', component: CoupensComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'Categoria',
    children: [
      {
        path: 'formulario',
        component: CategoriaFormComponent,
      },
      {
        path: 'tabela',
        component: CategoriaTableComponent,
      },
      {
        path: 'update/:idCategoria',
        component: CategoriaFormUpdateComponent,
      },
      {
        path: '',
        redirectTo: 'home', pathMatch: 'full'
      },
    ],
  },
  {
    path: 'Sistema',
    children: [
      {
        path: 'formulario',
        component: SistemaFormComponent,
      },
      {
        path: 'tabela',
        component: SistemaTableComponent,
      },
      {
        path: 'update/:idSistema',
        component: SistemaFormUpdateComponent,
      },
      {
        path: '',
        redirectTo: 'home', pathMatch: 'full'
      },
    ],
  },
  {
    path: 'Despesa',
    children: [
      {
        path: 'formulario',
        component: DespesaFormComponent,
      },
      {
        path: 'tabela',
        component: DespesaTableComponent,
      },
      {
        path: 'update/:idCategoria',
        component: DespesaFormUpdateComponent,
      },
      {
        path: '',
        redirectTo: 'home', pathMatch: 'full'
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}