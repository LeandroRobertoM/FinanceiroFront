import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { DespesaService } from 'src/app/services/despesa.service';
import { AuthService } from 'src/app/services/auth.service';
import { Despesa } from 'src/app/models/Despesa';

@Component({
  selector: 'app-despesa-table',
  templateUrl: './despesa-table.component.html',
  styleUrls: ['./despesa-table.component.scss']
})
export class DespesaTableComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['idDespesa', 'nome', 'valor', 'action'];
  dataSource = new MatTableDataSource<Despesa>();

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private authService: AuthService,
    private despesaService: DespesaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadDespesas();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  loadDespesas(): void {
    const userEmail = this.authService.getEmailUser();
    this.despesaService.ListaDespesaUsuarioTable(userEmail).subscribe(data => {
      this.dataSource.data = data;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  navigateToSistemaFinanceiroCreate(): void {
    this.router.navigate(['/Despesa/formulario']);
  }

  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getValue(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }
  
  public excluirSistemaFinanceiro(despesa: Despesa) {
    if (confirm(`Você Deseja Excluir o Sistema ${despesa.idDespesa}? sendo Excluindo todos os pedidos seram excluido`)) {
      //this.SistemaService.ListaSistemaUsuario(sistema).subscribe//
      (() => {
       // this.clienteservice.showMessage("Cliente excluido com sucesso!");

      });
    }
  }
}

