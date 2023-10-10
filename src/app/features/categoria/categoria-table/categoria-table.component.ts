import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table'
import { categoriaService } from 'src/app/services/categoria.service';
import { ICategoria } from '../Categoria.model';
import { MatSort } from '@angular/material/sort';
import { Observable } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator'
import { Router } from '@angular/router';


@Component({
  selector: 'app-categoria-table',
  templateUrl: './categoria-table.component.html',
  styleUrls: ['./categoria-table.component.scss']
})
export class CategoriaTableComponent implements OnInit, AfterViewInit {

  displayedColumns = ['idCliente', 'nome', 'cpf', 'pontosFidelidade', 'action']
  cliente: ICategoria;
  dataSource = new MatTableDataSource<ICategoria>

  @ViewChild(MatSort)
  sort!: MatSort;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(private categoriaService: categoriaService, private router: Router) {

    this.categoriaService.getAllCategoria().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngAfterViewInit(): void {

  }

  navigateToCategoriaCreate(): void {
    this.router.navigate(['/categoria/formulario'])
    console.log("console")
  }

  getValue(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }

  public excluirCliente(categoria: ICategoria) {
    if (confirm(`Você Deseja Excluir o Categoria ${categoria.nome}? sendo Excluindo todos os pedidos seram excluido`)) {
      this.categoriaService.deleteCliente(categoria).subscribe(() => {
        this.categoriaService.showMessage("Categoria excluido com sucesso!");
      });

    }
  }
}

