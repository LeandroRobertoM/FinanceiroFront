import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgSelectModule } from '@ng-select/ng-select';

//Desing components terceiros
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatTableModule} from '@angular/material/table'
import {MatSortModule} from '@angular/material/sort'
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SublevelMenuComponent } from './sidenav/sublevel-menu.component';
import { MatDividerModule } from '@angular/material/divider';






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

import { SistemaFormComponent } from './features/sistema/sistema-form/sistema-form.component';
import { SistemaFormUpdateComponent } from './features/sistema/sistema-form-update/sistema-form-update.component';
import { SistemaTableComponent } from './features/sistema/sistema-table/sistema-table.component';
import { DespesaFormComponent } from './features/despesa/despesa-form/despesa-form.component';
import { DespesaFormUpdateComponent } from './features/despesa/despesa-form-update/despesa-form-update.component';
import { DespesaTableComponent } from './features/despesa/despesa-table/despesa-table.component';
import { CommonModule } from '@angular/common';
import { HTTPStatus,LoaderInterceptor } from './interceptor/loader.interceptor';
import { catchError, map, startWith } from 'rxjs/operators'; 



import { Component, OnInit, ViewChild } from '@angular/core';
import { CategoriaFormComponent } from './features/categoria/categoria-form/categoria-form.component';





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
    DespesaFormComponent,
    DespesaFormUpdateComponent,
    DespesaTableComponent,
    CategoriaFormComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    NgSelectModule,
    MatIconModule,

    MatTableModule,
    MatSortModule,
    MatButtonModule,
    MatPaginatorModule,
    MatPaginatorModule,
    MatSortModule,
    MatDividerModule,

  
    
  ],
  providers: [
    AuthGuard,
    RxJS,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
