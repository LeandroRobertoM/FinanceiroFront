import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductsComponent } from './products/products.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { CoupensComponent } from './coupens/coupens.component';
import { SettingsComponent } from './settings/settings.component';
import { CategoriaFormComponent } from './features/categoria/categoria-form/categoria-form.component';
import { CategoriaTableComponent } from './features/categoria/categoria-table/categoria-table.component';
import { CategoriaFormUpdateComponent } from './features/categoria/categoria-form-update/categoria-form-update.component';


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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}