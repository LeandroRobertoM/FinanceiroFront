import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CategoriaService } from 'src/app/services/categoria.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table'
import { MatSort } from '@angular/material/sort';
import { Categoria } from 'src/app/models/Categoria';
import { MatPaginator } from '@angular/material/paginator'

@Component({
  selector: 'app-categoria-table',
  templateUrl: './categoria-table.component.html',
  styleUrls: ['./categoria-table.component.scss']
})
export class CategoriaTableComponent implements OnInit, AfterViewInit {

  displayedColumns = ['id', 'nome', 'action']
  categoria: Categoria;
  dataSource = new MatTableDataSource<Categoria>

  constructor(public authService: AuthService,private CategoriaService: CategoriaService, private router: Router) {


    this.CategoriaService.ListaCategoriaUsuarioTable('leandrorobertotec@uniplaclages.edu.br').subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

  }

  @ViewChild(MatSort)
  sort!: MatSort;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;


  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  navigateToCategoriaCreate(): void {
    this.router.navigate(['/Categoria/formulario'])
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

  public excluirCategoria(categoria: Categoria) {
    if (confirm(`Você Deseja Excluir o Sistema ${categoria.Id}? sendo Excluindo todos os pedidos seram excluido`)) {
      //this.SistemaService.ListaSistemaUsuario(sistema).subscribe//
      (() => {
       // this.clienteservice.showMessage("Cliente excluido com sucesso!");

      });
    }
  }
}

