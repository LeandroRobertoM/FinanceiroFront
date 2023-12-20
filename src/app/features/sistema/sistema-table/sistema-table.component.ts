import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SistemaFinanceiro } from 'src/app/models/SistemaFinanceiro';
import { MatTableDataSource, MatTableModule } from '@angular/material/table'
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator'
import { SistemaService } from 'src/app/services/sistema.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sistema-table',
  templateUrl: './sistema-table.component.html',
  styleUrls: ['./sistema-table.component.scss']
})
export class SistemaTableComponent implements OnInit, AfterViewInit {

  displayedColumns = ['id', 'nome', 'action']
  sistemafinanceiro: SistemaFinanceiro;
  dataSource = new MatTableDataSource<SistemaFinanceiro>

  @ViewChild(MatSort)
  sort!: MatSort;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(public authService: AuthService,private SistemaService: SistemaService, private router: Router) {


    this.SistemaService.ListaSistemaUsuarioTable('leandro.machados@ndd.com.br').subscribe(data => {
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
    this.router.navigate(['/Sistema/formulario'])
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

  public excluirSistemaFinanceiro(sistema: SistemaFinanceiro) {
    if (confirm(`Você Deseja Excluir o Sistema ${sistema.id}? sendo Excluindo todos os pedidos seram excluido`)) {
      //this.SistemaService.ListaSistemaUsuario(sistema).subscribe//
      (() => {
       // this.clienteservice.showMessage("Cliente excluido com sucesso!");

      });
    }
  }
}
