import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgSelectComponent, NgSelectModule } from '@ng-select/ng-select';

//Desing components terceiros
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatTableModule} from '@angular/material/table'
import {MatSortModule} from '@angular/material/sort'
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SublevelMenuComponent } from './sidenav/sublevel-menu.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { NgxMaskModule } from 'ngx-mask';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SistemafinanceiroComponent } from './features/sistemafinanceiro/sistemafinanceiro.component';
import { BodyComponent } from './body/body.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductsComponent } from './products/products.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { CoupensComponent } from './coupens/coupens.component';
import { PagesComponent } from './pages/pages.component';
import { MediaComponent } from './media/media.component';
import { SettingsComponent } from './settings/settings.component';
import { LoginComponent } from './features/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http'; 
import { AuthGuard } from './guards/auth-guard.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';

import { SistemaFormComponent } from './features/sistema/sistema-form/sistema-form.component';
import { SistemaFormUpdateComponent } from './features/sistema/sistema-form-update/sistema-form-update.component';
import { SistemaTableComponent } from './features/sistema/sistema-table/sistema-table.component';
import { DespesaFormUpdateComponent } from './features/despesa/despesa-form-update/despesa-form-update.component';
import { DespesaTableComponent } from './features/despesa/despesa-table/despesa-table.component';
import { CommonModule } from '@angular/common';
import { HTTPStatus,LoaderInterceptor } from './interceptor/loader.interceptor';
import { catchError, map, startWith } from 'rxjs/operators'; 



import { Component, OnInit, ViewChild } from '@angular/core';
import { CategoriaFormComponent } from './features/categoria/categoria-form/categoria-form.component';
import { DespesaFormComponent } from './features/despesa-form/despesa-form.component';
import { CategoriaTableComponent } from './features/categoria/categoria-table/categoria-table.component';
import { UsuarioFormComponent } from './features/usuario/usuario-form/usuario-form.component';
import { UsuarioTableComponent } from './features/usuario/usuario-table/usuario-table.component';
import { UsuarioTableSistemaDialogComponent } from './features/usuario/usuario-table-sistema-dialog/usuario-table-sistema-dialog.component';
import { UsuarioFormUpdateComponent } from './features/usuario/usuario-form-update/usuario-form-update.component';
import { LoginRegisterComponent } from './features/login/login-register/login-register.component';
import { EmailConfirmationComponent } from './features/authentication/email-confirmation/email-confirmation.component';
import { ResetPasswordComponent } from './features/authentication/reset-password/reset-password.component';
import { ForgotPasswordComponent } from './features/authentication/forgot-password/forgot-password.component';
import { HeaderComponent } from './header/header.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { CustomSnackbarComponent } from './components/CustomSnackbarService/custom-snackbar/custom-snackbar.component';

//servicos
import { CustomSnackbarService } from './components/CustomSnackbarService/custom-snackbar/custom-snackbar.service';
import { ResetConfirmationComponent } from './features/authentication/reset-confirmation/reset-confirmation.component';



const RxJS = [LoaderInterceptor, HTTPStatus];


@NgModule({
  declarations: [
    AppComponent,
    SistemafinanceiroComponent,
    BodyComponent,
    SidenavComponent,
    DashboardComponent,
    ProductsComponent,
    StatisticsComponent,
    CoupensComponent,
    PagesComponent,
    MediaComponent,
    SettingsComponent,
    SublevelMenuComponent,
    LoginComponent,
    SistemaFormComponent,
    SistemaFormUpdateComponent,
    SistemaTableComponent,
    DespesaFormUpdateComponent,
    DespesaTableComponent,
    CategoriaFormComponent,
    DespesaFormComponent,
    CategoriaTableComponent,
    UsuarioFormComponent,
    UsuarioTableComponent,
    UsuarioTableSistemaDialogComponent,
    UsuarioFormUpdateComponent,
    LoginRegisterComponent,
    EmailConfirmationComponent,
    ResetPasswordComponent,
    ForgotPasswordComponent,
    HeaderComponent,
    BreadcrumbComponent,
    CustomSnackbarComponent,
    ResetConfirmationComponent,
    
 
    

  ],
  imports: [
    NgxMaskModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgSelectModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatSortModule,
    MatButtonModule,
    MatPaginatorModule,
    MatPaginatorModule,
    MatSortModule,
    MatDividerModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    MatDialogModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSnackBarModule, 
  
    
  ],
  providers: [
    CustomSnackbarService,
    AuthGuard,
    RxJS,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
