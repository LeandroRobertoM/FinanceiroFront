import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgSelectModule } from '@ng-select/ng-select';

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
import { CategoriaFormComponent } from './features/categoria/categoria-form/categoria-form.component';
import { CategoriaFormUpdateComponent } from './features/categoria/categoria-form-update/categoria-form-update.component';
import { CategoriaTableComponent } from './features/categoria/categoria-table/categoria-table.component';
import { SistemaFormComponent } from './features/sistema/sistema-form/sistema-form.component';
import { SistemaFormUpdateComponent } from './features/sistema/sistema-form-update/sistema-form-update.component';
import { SistemaTableComponent } from './features/sistema/sistema-table/sistema-table.component';
import { DespesaFormComponent } from './features/despesa/despesa-form/despesa-form.component';
import { DespesaFormUpdateComponent } from './features/despesa/despesa-form-update/despesa-form-update.component';
import { DespesaTableComponent } from './features/despesa/despesa-table/despesa-table.component';
import { CommonModule } from '@angular/common';
import { HTTPStatus,LoaderInterceptor } from './interceptor/loader.interceptor';
import { catchError, map, startWith } from 'rxjs/operators'; 


import { MatTableModule } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SublevelMenuComponent } from './sidenav/sublevel-menu.component';

//Services
import { categoriaService } from './services/categoria.service';



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
    CategoriaFormComponent,
    CategoriaFormUpdateComponent,
    CategoriaTableComponent,
    SistemaFormComponent,
    SistemaFormUpdateComponent,
    SistemaTableComponent,
    DespesaFormComponent,
    DespesaFormUpdateComponent,
    DespesaTableComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule, 
    MatSnackBarModule,
    NgSelectModule,
  
    
  ],
  providers: [
    AuthGuard,
    RxJS,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
