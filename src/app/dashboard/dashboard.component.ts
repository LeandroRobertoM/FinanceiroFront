import { AuthService } from '../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { DespesaService } from '../services/despesa.service';
import { FiltroGrafico } from '../models/filtrografico/FiltroGrafico';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  dataInicio: string;
  dataFim: string;
  sistemas = [
    { id: 1, nome: 'Sistema A' },
    { id: 2, nome: 'Sistema B' },
    { id: 3, nome: 'Sistema C' },
  ];
  sistemaSelecionado: number | null = null;
  objetoGrafico: any;

  constructor(public authService: AuthService, public despesaService: DespesaService) { }

  ngOnInit(): void {

    const today = new Date();
    this.dataFim = today.toISOString().split('T')[0];
    const thirtyDaysAgo = new Date(today);
    thirtyDaysAgo.setDate(today.getDate() - 30);
    this.dataInicio = thirtyDaysAgo.toISOString().split('T')[0];
    this.CarregaGraficosFiltros();
  }

  CarregaGraficos() {
    this.despesaService.CarregaGraficos(this.authService.getEmailUser())
      .subscribe(
        (response: any) => {
          this.objetoGrafico = response;
        },
        (error) => console.error(error)
      );
  }

  CarregaGraficosFiltros() {
    const filtro: FiltroGrafico = {
      dataInicio: this.dataInicio,
      dataFim: this.dataFim,
      emailUsuario: this.authService.getEmailUser(),
    };

    this.despesaService.CarregaGraficosFiltro(
      filtro.emailUsuario,
      filtro.dataInicio,
      filtro.dataFim
    ).subscribe(
      (response: any) => {
        this.objetoGrafico = response;
      },
      (error) => console.error(error)
    );
  }

  AtualizarDashboard() {
    const filtro: FiltroGrafico = {
      dataInicio: this.dataInicio,
      dataFim: this.dataFim,
      emailUsuario: this.authService.getEmailUser(),
    };

    this.despesaService.CarregaGraficosFiltro(
      filtro.emailUsuario,
      filtro.dataInicio,
      filtro.dataFim,
    //
    ).subscribe(
      (response: any) => {
        this.objetoGrafico = response;
      },
      (error) => console.error(error)
    );
  }
}
