import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { SistemaService } from 'src/app/services/sistema.service';
import { AuthService } from 'src/app/services/auth.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SistemaFinanceiro } from 'src/app/models/SistemaFinanceiro';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog } from '@angular/material/dialog';
import { UsuarioTableSistemaDialogComponent } from '../usuario-table-sistema-dialog/usuario-table-sistema-dialog.component';


@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.scss']
})
export class UsuarioFormComponent implements OnInit, AfterViewInit {
  public form!: FormGroup;
  exibirGridSistemas: boolean = false;
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
    private sistemaService: SistemaService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    public dialog:MatDialog
    

  ) {}

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.form = this.formBuilder.group({
      cpf: ['', [Validators.required]],
      email: ['', [Validators.required]],
      senha: ['', [Validators.required]]
    });
  }

  salvar(): void {
    if (this.form.valid) {
      const novoUsuario = {
        Email: this.form.value.email,
        CPF: this.form.value.cpf,
        Senha: this.form.value.senha
      };

      this.userService.adicionarUsuario(novoUsuario).subscribe(
        (response: any) => {
          const usuarioModel: any = response.dados;
          this.userService.showMessage('Usuário criado com sucesso!');
          this.router.navigate(['/products']);
        },
        (error) => {
          console.error(error);
          this.userService.showMessage('Erro ao criar o usuário.', true);
        }
      );
    }
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.paginator.page.subscribe((event: PageEvent) => {
      this.atualizarGrid();
    });
  }

  exibirListaSistemas(): void {
    this.sistemaService.ListaSistemaUsuarioTable(this.authService.getEmailUser()).subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.atualizarGrid();
      this.exibirGridSistemas = true; 
    });
  }

  exibirListaSistemasAdicionadosUsuario(): void {
    this.dataSources = new MatTableDataSource<string>(this.sistemasSelecionados);
    this.atualizarGrid();
    this.exibirGridSistemasAdicionados = true; 
    this.exibirGridSistemas = false; 
  }

  atualizarGrid(): void {
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, 0);
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

  getSelectedIds(): void {
    // Adiciona os sistemas selecionados à lista existente
    const sistemasSelecionadosAtuais = this.dataSource.data
        .filter(item => this.selection.isSelected(item))
        .map(item => item.nome);

    // Mantém os sistemas selecionados anteriores, se houver
    this.sistemasSelecionados = [...this.sistemasSelecionados, ...sistemasSelecionadosAtuais];

    // Exibe os sistemas selecionados no console
    console.log("Sistemas Selecionados:", this.sistemasSelecionados);

    // Mantém os grids de exibição conforme necessário
    this.exibirGridSistemas = false;
    this.exibirGridSistemasAdicionados = true;
}

  removerSistema(sistema: string): void {
    this.sistemasSelecionados = this.sistemasSelecionados.filter(item => item !== sistema);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getValue(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }
  
  openDialog():void{
    const dialogRef = this.dialog.open(UsuarioTableSistemaDialogComponent,{
      width: '800px',
      height: '800px',
      position: {
        left: '600px' // Posição em relação ao lado direito da janela
      }
    });

    dialogRef.afterOpened().subscribe(() => {
       dialogRef.componentInstance.exibirListaSistemasAdicionadosUsuarioDialog
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log("the dialog was closed")
    });


  }
 

}
