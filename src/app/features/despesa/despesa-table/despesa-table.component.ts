import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { DespesaService } from 'src/app/services/despesa.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table'
import { MatSort } from '@angular/material/sort';
import { Despesa } from 'src/app/models/Despesa';
import { MatPaginator } from '@angular/material/paginator'

@Component({
  selector: 'app-despesa-table',
  templateUrl: './despesa-table.component.html',
  styleUrls: ['./despesa-table.component.scss']
})
export class DespesaTableComponent implements OnInit, AfterViewInit {

  displayedColumns = ['idDespesa', 'nome','valor', 'action']
  despesa: Despesa;
  dataSource = new MatTableDataSource<Despesa>

  @ViewChild(MatSort)
  sort!: MatSort;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(public authService: AuthService,private DespesaService: DespesaService, private router: Router) {


    this.DespesaService.ListaDespesaUsuarioTable('leandrorobertotec@uniplaclages.edu.br').subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  navigateToSistemaFinanceiroCreate(): void {
    this.router.navigate(['/Despesa/formulario'])
    console.log("console")
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngAfterViewInit(): void {

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

