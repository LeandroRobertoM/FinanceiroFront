
import { MatDialogRef } from '@angular/material/dialog';
import { AfterViewInit, Component, OnInit, ViewChild,EventEmitter,Output } from '@angular/core';
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

  @Output() sistemasSelecionadosEvent = new EventEmitter<{ codigo: number, nome: string }[]>();
  exibirGridSistemas: boolean = true;
  exibirGridSistemasAdicionados: boolean = false;

  displayedColumns = ['select', 'id', 'nome'];
  dataSource = new MatTableDataSource<SistemaFinanceiro>();

  //GridSistemasAdicionadosUsuarios
  displayedColumnss = ['select', 'id', 'nome'];
  dataSources = new MatTableDataSource<string>();

  sistemasSelecionados: { codigo: number, nome: string }[] = [];

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
  

  getSelectedIdsDialog(): void {
    // Obtém os sistemas selecionados da fonte de dados
    const sistemasSelecionadosAtuais = this.dataSource.data
      .filter(item => this.selection.isSelected(item))
      .map(item => ({ codigo: item.id, nome: item.nome }));
  
    // Emite os sistemas selecionados através do evento sistemasSelecionadosEvent
    this.sistemasSelecionadosEvent.emit(sistemasSelecionadosAtuais);
    console.log("Event emitted with selected systems:", sistemasSelecionadosAtuais);
  
    // Adiciona os sistemas selecionados à lista existente e exibe-os no console
    this.sistemasSelecionados.push(...sistemasSelecionadosAtuais);
    console.log("Sistemas Selecionados:", this.sistemasSelecionados);
  
    // Fecha o diálogo e executa a função cancel
    this.dialogRef.close(sistemasSelecionadosAtuais);
    this.cancel();
  }

  getValue(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }

  getSistemasSelecionados(): { codigo: number, nome: string }[] {
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


