
import { MatDialogRef } from '@angular/material/dialog';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SistemaFinanceiro } from 'src/app/models/SistemaFinanceiro';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { SistemaService } from 'src/app/services/sistema.service';
import { AuthService } from 'src/app/services/auth.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-usuario-table-sistema-dialog',
  templateUrl: './usuario-table-sistema-dialog.component.html',
  styleUrls: ['./usuario-table-sistema-dialog.component.scss']
})
export class UsuarioTableSistemaDialogComponent implements OnInit,AfterViewInit {

  exibirGridSistemas: boolean = true;
  exibirGridSistemasAdicionados: boolean = false;

  displayedColumns = ['select', 'id', 'nome'];
  dataSource = new MatTableDataSource<SistemaFinanceiro>();

  //GridSistemasAdicionadosUsuarios
  displayedColumnss = ['select', 'id', 'nome'];
  dataSources = new MatTableDataSource<string>();

  sistemasSelecionados: string[] = [];

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  selection = new SelectionModel<SistemaFinanceiro>(true, []);

  constructor(
    public authService: AuthService,
    public dialogRef: MatDialogRef<UsuarioTableSistemaDialogComponent>,
    private router: Router,
    private sistemaService: SistemaService,
    private userService: UserService,
    
   
    ) { }
  
  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.exibirListaSistemas();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.paginator.page.subscribe((event: PageEvent) => {
      this.atualizarGrid();

    });

    this.paginator.page.subscribe((event: PageEvent) => {
      this.atualizarGrid();
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  atualizarGrid(): void {
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, 0);
  }
  
  cancel():void{
    this.dialogRef.close();
  } 

  public exibirListaSistemas(): void {
    this.sistemaService.ListaSistemaUsuarioTable(this.authService.getEmailUser()).subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.atualizarGrid();
      this.exibirGridSistemas = true; 
    });
  }
  

  exibirListaSistemasAdicionadosUsuarioDialog(): void {
    this.dataSources = new MatTableDataSource<string>(this.sistemasSelecionados);
    this.atualizarGrid();
    this.exibirGridSistemas = false; 
  }
  getSelectedIds(): void {
    // Adiciona os sistemas selecionados à lista existente
    const sistemasSelecionadosAtuais = this.dataSource.data
        .filter(item => this.selection.isSelected(item))
        .map(item => item.nome);

    // Mantém os sistemas selecionados anteriores, se houver
    this.sistemasSelecionados = [...this.sistemasSelecionados, ...sistemasSelecionadosAtuais];

    // Exibe os sistemas selecionados no console
    console.log("Sistemas SelecionadosPrimeiraVez:", this.sistemasSelecionados);

    this.cancel();
  }
  getValue(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }

  getSistemasSelecionados(): string[] {
    return this.sistemasSelecionados;
  }

  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle(): void {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

 
}


