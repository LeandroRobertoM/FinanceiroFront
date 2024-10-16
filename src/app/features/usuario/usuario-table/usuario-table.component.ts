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

  public userData: any[] = [];
  displayedColumns = ['id', 'userName','Email', 'action']
  usuarioModel: UsuarioModel;
  dataSource = new MatTableDataSource<UsuarioModel>
  dataInicio: string = '';
  dataFim: string = '';
  situacao: string = '';
  selectedRow: UsuarioModel | null = null; 

  @ViewChild(MatSort)
  sort!: MatSort;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(public authService: AuthService,private UserService: UserService, private router: Router) {


    /// lista despesa Usuarios
    this.UserService.getUserObterVinculados(this.authService.getEmailUser()).subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.userData = data;
    });

  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  navigateToSistemaFinanceiroCreate(): void {
    this.router.navigate(['/Usuario/formulario'])
    console.log("console")
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
  apagarFiltro() {
    this.dataInicio = '';
    this.dataFim = '';
    this.situacao = '';
    this.applyFilter(''); // Para resetar outros filtros se necessário
  }
  filterByDateRange() {
    // Lógica para filtrar os dados pela data de início e data de fim
}

// Método para filtrar por situação
filterBySituacao() {
    // Lógica para filtrar os dados pela situação
  }  

  ngAfterViewInit(): void {

  }
  getValue(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }

  public excluirSistemaFinanceiro(UsuarioModel: UsuarioModel) {
    if (confirm(`Você Deseja Excluir o Sistema ${UsuarioModel.UserId}? sendo Excluindo todos os pedidos seram excluido`)) {
      //this.SistemaService.ListaSistemaUsuario(sistema).subscribe//
      (() => {
       // this.clienteservice.showMessage("Cliente excluido com sucesso!");

      });
    }
  }
  editarUsuario(usuario: UsuarioModel) {
    this.router.navigate(['/Usuario/update', usuario.id], { state: { usuario } });
  }
}