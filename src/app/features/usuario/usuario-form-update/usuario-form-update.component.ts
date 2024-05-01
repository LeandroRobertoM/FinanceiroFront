import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { UsuarioSistemaService } from 'src/app/services/usuariosistema.Service';
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
import { SistemaFinanceiroModel } from 'src/app/models/SistemaFinanceiroModel';
import { UsuarioSistemaModel } from 'src/app/models/UsuarioSistemaModel';


@Component({
  selector: 'app-usuario-form-update',
  templateUrl: './usuario-form-update.component.html',
  styleUrls: ['./usuario-form-update.component.scss']
})
export class UsuarioFormUpdateComponent implements OnInit, AfterViewInit {

  public form!: FormGroup;
  exibirGridSistemas: boolean = false;
  exibirGridSistemasAdicionados: boolean = false;

  displayedColumns = ['select', 'id', 'nome'];
  dataSource = new MatTableDataSource<SistemaFinanceiro>();

  //GridSistemasAdicionadosUsuarios
  displayedColumnss = ['select', 'id', 'nome'];
  dataSources = new MatTableDataSource<string>();

  userId: string = '';
  sistemasSelecionados: string[] = [];
  sistemasSelecionadosLocal: { codigo: number, nome: string }[] = [];

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  selection = new SelectionModel<SistemaFinanceiro>(true, []);

  constructor(
    public authService: AuthService,
    private sistemaService: SistemaService,
    private usuariosistemaService:UsuarioSistemaService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    public dialog:MatDialog
    

  ) {}

  ngOnInit(): void {
    const userId = this.authService.getUserId();
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
        Senha: this.form.value.senha,
        IdUsuarioLogado:this.userId
      };
  
      this.userService.adicionarUsuarioCreate(novoUsuario).subscribe(
        (response: any) => {
          const usuarioModel: any = response.dados;
          this.userService.showMessage('Usuário criado com sucesso!');
          
          // Obtendo o email do usuário logado
          const emailUsuarioLogado = this.authService.getEmailUser();

          
          // Vinculando usuário aos sistemas financeiros
          this.vincularUsuarioSistema();
          this.router.navigate(['/products']);
        },
        (error) => {
          console.error(error);
          this.userService.showMessage('Erro ao criar o usuário.', true);
        }
      );
    }
  }

  vincularUsuarioSistema(): void {
    if (this.form.valid) {
      const usuarioSistema: UsuarioSistemaModel = {
        emailUsuario: this.form.value.email,
        sistemasFinanceiros: []
      };
     // Preencher a lista de sistemasFinanceiros
    this.sistemasSelecionadosLocal.forEach(sistema => {
      const sistemaFinanceiro: SistemaFinanceiroModel = {
        id: sistema.codigo,
        nome: sistema.nome
      };
      usuarioSistema.sistemasFinanceiros.push(sistemaFinanceiro);
    });
    
    // Chamar o serviço com o objeto usuarioSistema
    this.usuariosistemaService.AdicionarListaSistemaFinanceiro(usuarioSistema).subscribe(
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

  removerSistemass(sistema: string): void {
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

  removerSistema(sistema: { codigo: number; nome: string; }): void {
    const index = this.sistemasSelecionadosLocal.findIndex(s => s.codigo === sistema.codigo);
    if (index !== -1) {
      this.sistemasSelecionadosLocal.splice(index, 1);
    }
  }

  getUserIdByEmail(email: string): void {
    this.userService.getUserIdByEmail(email).subscribe(
      (userId: string) => {
        console.log('ID do usuário obtido:', userId);
        this.userId=userId;
      },
      (error) => {
        console.error('Erro ao obter o ID do usuário por email:', error);
      }
    );
  }
  
  openDialog(): void {
    const dialogRef = this.dialog.open(UsuarioTableSistemaDialogComponent, {
      // Defina as configurações do dialog conforme necessário
      maxWidth: '100vw',
      maxHeight: '100h',
      position: {
        right: '100',
        top: '100'
      }
    });
  
    let sistemasSelecionadosDialog: { codigo: number, nome: string }[] = []; // Variável temporária para armazenar os sistemas selecionados do diálogo

    // Obtém a referência do dialogRef e acessa a variável sistemasSelecionados
    dialogRef.afterOpened().subscribe(() => {
      sistemasSelecionadosDialog = dialogRef.componentInstance.sistemasSelecionados;
      console.log("Sistemas Selecionados do diálogo:", sistemasSelecionadosDialog);
    });
  
    dialogRef.afterClosed().subscribe(result => {
      // Adicione os novos sistemas selecionados do diálogo à variável local this.sistemasSelecionadosLocal
      sistemasSelecionadosDialog.forEach(sistema => {
        if (!this.sistemasSelecionadosLocal.some(local => local.codigo === sistema.codigo)) {
          this.sistemasSelecionadosLocal.push(sistema);
        }
      });
  
      console.log("Sistemas Selecionados Local:", this.sistemasSelecionadosLocal);
      this.getUserIdByEmail(this.authService.getEmailUser());
      console.log("Sistemas Selecionados Local:", this.userId);
      // Faça o que desejar após o fechamento do diálogo
    });
  }
}
