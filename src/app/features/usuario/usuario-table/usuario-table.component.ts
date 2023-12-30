import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table'
import { MatSort } from '@angular/material/sort'
import { UsuarioModel } from 'src/app/models/UsuarioModel';
import { MatPaginator } from '@angular/material/paginator'

@Component({
  selector: 'app-usuario-table',
  templateUrl: './usuario-table.component.html',
  styleUrls: ['./usuario-table.component.scss']
})
export class UsuarioTableComponent implements OnInit, AfterViewInit {

  displayedColumns = ['id', 'UserName','Email', 'action']
  usuarioModel: UsuarioModel;
  dataSource = new MatTableDataSource<UsuarioModel>

  @ViewChild(MatSort)
  sort!: MatSort;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(public authService: AuthService,private UserService: UserService, private router: Router) {


    /// lista despesa Usuarios
    this.UserService.ListaDespesaUsuarioTable((this.authService.getEmailUser())).subscribe(data => {
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