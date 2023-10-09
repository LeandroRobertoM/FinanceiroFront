import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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

// Importe o ReactiveFormsModule aqui
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
    LoginComponent,
    CategoriaFormComponent,
    CategoriaFormUpdateComponent,
    CategoriaTableComponent,
    SistemaFormComponent,
    SistemaFormUpdateComponent,
    SistemaTableComponent,
    DespesaFormComponent,
    DespesaFormUpdateComponent,
    DespesaTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    // Adicione o ReactiveFormsModule às importações do AppModule
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
