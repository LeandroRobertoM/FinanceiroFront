import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductsComponent } from './products/products.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { CoupensComponent } from './coupens/coupens.component';
import { SettingsComponent } from './settings/settings.component';

import { AuthGuard } from './guards/auth-guard.service';

import { SistemaFormComponent } from './features/sistema/sistema-form/sistema-form.component';
import { SistemaTableComponent } from './features/sistema/sistema-table/sistema-table.component';
import { SistemaFormUpdateComponent } from './features/sistema/sistema-form-update/sistema-form-update.component';
import { DespesaFormComponent } from './features/despesa/despesa-form/despesa-form.component';
import { DespesaTableComponent } from './features/despesa/despesa-table/despesa-table.component';
import { DespesaFormUpdateComponent } from './features/despesa/despesa-form-update/despesa-form-update.component';
import { PagesComponent } from './pages/pages.component';
import { CategoriaFormComponent } from './features/categoria/categoria-form/categoria-form.component';


const routes: Routes = [
 // { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path:'login',component:LoginComponent}, 
  { path: 'dashboard', component: DashboardComponent,canActivate: [AuthGuard] },
  { path: 'products', component: ProductsComponent,canActivate: [AuthGuard]  },
  { path: 'statistics', component: StatisticsComponent,canActivate: [AuthGuard]  },
  { path: 'coupens', component: CoupensComponent,canActivate: [AuthGuard]  },
  { path: 'settings', component: SettingsComponent,canActivate: [AuthGuard]  },
  { path: 'login', component: LoginComponent,canActivate: [AuthGuard]  },
  {
    path: 'Categoria',
    children: [
      {
        path: 'formulario',
        component: CategoriaFormComponent,
        canActivate:[AuthGuard]
      },
      {
        path: 'tabela',
        component: CategoriaFormComponent,
        canActivate:[AuthGuard]
      },
      {
        path: 'update/:idCategoria',
        component: CategoriaFormComponent,
        canActivate:[AuthGuard]
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
        canActivate:[AuthGuard]
      },
      {
        path: 'tabela',
        component: SistemaTableComponent,
        canActivate:[AuthGuard]
      },
      {
        path: 'update/:idSistema',
        component: SistemaFormUpdateComponent,
        canActivate:[AuthGuard]
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
        canActivate:[AuthGuard]
      },
      {
        path: 'tabela',
        component: DespesaTableComponent,
        canActivate:[AuthGuard]
      },
      {
        path: 'update/:idCategoria',
        component: DespesaFormUpdateComponent,
        canActivate:[AuthGuard]
      },
      {
        path: '',
        redirectTo: 'home', pathMatch: 'full'
      },
    ],
  },
  {
    path: 'Pages',
    children: [
      {
        path: 'pages',
        component: PagesComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}