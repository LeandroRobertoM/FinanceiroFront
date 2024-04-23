import { AuthService } from '../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { DespesaService } from '../services/despesa.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {


  constructor(public authService: AuthService, public despesaService: DespesaService) { }

  ngOnInit(): void {
    this.CarregaGraficos();
  }

  objetoGrafico: any;
// carrega os graficos 
  CarregaGraficos() {
    this.despesaService.CarregaGraficos(this.authService.getEmailUser())
      .subscribe((response: any) => {

        debugger
        this.objetoGrafico = response;
      },
        (error) => console.error(error),
        () => {

        }

      )

  }

}