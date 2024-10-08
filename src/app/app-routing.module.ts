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
import { DespesaTableComponent } from './features/despesa/despesa-table/despesa-table.component';
import { DespesaFormUpdateComponent } from './features/despesa/despesa-form-update/despesa-form-update.component';
import { PagesComponent } from './pages/pages.component';
import { CategoriaFormComponent } from './features/categoria/categoria-form/categoria-form.component';
import { DespesaFormComponent } from './features/despesa-form/despesa-form.component';
import { CategoriaTableComponent } from './features/categoria/categoria-table/categoria-table.component';
import { UsuarioFormComponent } from './features/usuario/usuario-form/usuario-form.component';
import { UsuarioTableComponent } from './features/usuario/usuario-table/usuario-table.component';
import { UsuarioFormUpdateComponent } from './features/usuario/usuario-form-update/usuario-form-update.component';
import { LoginRegisterComponent } from './features/login/login-register/login-register.component';
import { EmailConfirmationComponent } from './features/authentication/email-confirmation/email-confirmation.component';
import { ResetPasswordComponent } from './features/authentication/reset-password/reset-password.component';
import { ForgotPasswordComponent } from './features/authentication/forgot-password/forgot-password.component';
import { ResetConfirmationComponent } from './features/authentication/reset-confirmation/reset-confirmation.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginComponent,
    children: [
      { path: 'registrar', component: LoginRegisterComponent }
    ]
  },
  { path: 'registrar', component: LoginRegisterComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'products', component: ProductsComponent, canActivate: [AuthGuard] },
  { path: 'statistics', component: StatisticsComponent, canActivate: [AuthGuard] },
  { path: 'coupens', component: CoupensComponent, canActivate: [AuthGuard] },
  { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard] },
  { path: 'emailconfirmation', component: EmailConfirmationComponent },
  { path: 'resetpassword', component: ResetPasswordComponent },
  {
    path: 'authentication',
    children: [
      {
        path: 'emailconfirmation',
        component: EmailConfirmationComponent,
      },
      {
        path: '',
        redirectTo: 'emailconfirmation',
        pathMatch: 'full'
      },
    ],
  },
  {
    path: 'authentication',
    children: [
      {
        path: 'resetpassword',
        component: ResetPasswordComponent,
      },
      {
        path: '',
        redirectTo: 'resetpassword',
        pathMatch: 'full'
      },
    ],
  },
  {
    path: 'authentication',
    children: [
      {
        path: 'ForgotPassword',
        component: ForgotPasswordComponent,
      },
      {
        path: '',
        redirectTo: 'ForgotPassword',
        pathMatch: 'full'
      },
    ],
  },
  {
    path: 'authentication',
    children: [
      {
        path: 'ResetConfirmation',
        component: ResetConfirmationComponent,
      },
      {
        path: '',
        redirectTo: 'c',
        pathMatch: 'full'
      },
    ],
  },
  {
    path: 'Categoria',
    children: [
      {
        path: 'formulario',
        component: CategoriaFormComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'tabela',
        component: CategoriaTableComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'update/:idCategoria',
        component: CategoriaFormComponent,
        canActivate: [AuthGuard]
      },
      {
        path: '',
        redirectTo: 'home', pathMatch: 'full'
      },
    ],
  },
  {
    path: 'Sistema',
    data: { breadcrumb: 'Financeiro' },
    children: [
      {
        path: 'formulario',
        data: { breadcrumb: 'formulario' },
        component: SistemaFormComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'tabela',
        component: SistemaTableComponent,
        data: { breadcrumb: 'tabela' },
        canActivate: [AuthGuard]
      },
      {
        path: 'update/:idSistema',
        component: SistemaFormUpdateComponent,
        canActivate: [AuthGuard]
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
        canActivate: [AuthGuard]
      },
      {
        path: 'tabela',
        component: DespesaTableComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'update/:idCategoria',
        component: DespesaFormUpdateComponent,
        canActivate: [AuthGuard]
      },
      {
        path: '',
        redirectTo: 'home', pathMatch: 'full'
      },
    ],
  },
  {
    path: 'Usuario',
    children: [
      {
        path: 'formulario',
        component: UsuarioFormComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'tabela',
        component: UsuarioTableComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'update/:id',
        component: UsuarioFormUpdateComponent,
        canActivate: [AuthGuard]
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
