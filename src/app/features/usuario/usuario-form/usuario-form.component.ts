import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
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
import { debounceTime } from 'rxjs/operators';
import { UsuarioModel } from 'src/app/models/UsuarioModel';

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
  displayedColumnss = ['select', 'id', 'nome'];
  dataSources = new MatTableDataSource<string>();
  userId: string = '';
  useremail: string = '';
  emailUsuarioLogado: string = '';
  sistemasSelecionados: string[] = [];
  sistemasSelecionadosLocal: { codigo: number, nome: string }[] = [];
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  selection = new SelectionModel<SistemaFinanceiro>(true, []);
  private doneTypingInterval = 500; // Tempo para aguardar após a última digitação

  constructor(
    public authService: AuthService,
    private sistemaService: SistemaService,
    private usuariosistemaService: UsuarioSistemaService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.BuscarIDuser();
    console.log('ID do usuário:', this.userId);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    
    this.form = this.formBuilder.group({
      cpf: ['', [Validators.required, this.cpfValidator]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', Validators.required]
    });

    // Adiciona o listener para o campo CPF com debounce
    this.form.get('cpf')?.valueChanges.pipe(
      debounceTime(this.doneTypingInterval)
    ).subscribe(value => {
      this.applyMask(value);
    });
  }

  salvar(): void {
    if (this.form.valid) {
       console.log("Usuario logado lista"+this.userId); // Verificar o valor de this.userId
       const salvarUsuario = {
          email: this.form.value.email,
          CPF: this.form.value.cpf,
          Senha: this.form.value.senha,
          IdUsuarioLogado: this.userId,
          clientURI: 'http://164.163.10.101:8080/authentication/ResetConfirmation'
       };
 
       this.userService.adicionarUsuarioCreate(salvarUsuario).subscribe(
          (response: any) => {
             const usuarioModel: any = response.dados;
             this.userService.showMessage('Usuário atualizado com sucesso!');
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

  public BuscarIDuser(): void {
    this.userService.getObterUserId(this.authService.getUserEmaillogin()).subscribe(data => {
      this.userId = data.id;
      console.log("Usuario dentro local buscarId:", this.userId);
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
    const sistemasSelecionadosAtuais = this.dataSource.data
        .filter(item => this.selection.isSelected(item))
        .map(item => item.nome);

    this.sistemasSelecionados = [...this.sistemasSelecionados, ...sistemasSelecionadosAtuais];
    console.log("Sistemas Selecionados:", this.sistemasSelecionados);
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
// este metodo busca os sistemas financeiros que usuario pegou
getUserIdByEmail(email: string): void {
  this.userService.getObterUserId(email).subscribe(
    (usuario: UsuarioModel) => {
      this.userId = usuario.id; // Supondo que o ID esteja na propriedade 'id' do objeto retornado
      console.log('ID do usuário obtido: linha 215', this.userId);
    },
    (error) => {
      console.error('Erro ao obter o ID do usuário por email:', error);
    }
  );
}

  openDialog(): void {
    const dialogRef = this.dialog.open(UsuarioTableSistemaDialogComponent, {
      maxWidth: '100vw',
      maxHeight: '100h',
      position: {
        right: '100',
        top: '100'
      }
    });

    let sistemasSelecionadosDialog: { codigo: number, nome: string }[] = [];

    dialogRef.afterOpened().subscribe(() => {
      sistemasSelecionadosDialog = dialogRef.componentInstance.sistemasSelecionados;
      console.log("Sistemas Selecionados do diálogo:", sistemasSelecionadosDialog);
    });

    dialogRef.afterClosed().subscribe(result => {
      sistemasSelecionadosDialog.forEach(sistema => {
        if (!this.sistemasSelecionadosLocal.some(local => local.codigo === sistema.codigo)) {
          this.sistemasSelecionadosLocal.push(sistema);
        }
      });

      this.getUserIdByEmail(this.authService.getEmailUser());
      console.log("Sistemas Selecionados Local:", this.sistemasSelecionadosLocal);
    });
  }

  applyMask(value: string): void {
    if (value) {
      // Remove todos os caracteres não numéricos
      let maskedValue = value.replace(/\D/g, '');
      
      // Limita a 11 caracteres
      if (maskedValue.length > 11) {
        maskedValue = maskedValue.slice(0, 11);
      }
      
      // Aplica a máscara no formato XXX.XXX.XXX-XX
      maskedValue = maskedValue.replace(/^(\d{3})(\d)/, '$1.$2');
      maskedValue = maskedValue.replace(/\.(\d{3})(\d)/, '.$1.$2');
      maskedValue = maskedValue.replace(/\.(\d{3})(\d{1,2})$/, '.$1-$2');
      
      // Atualiza o valor do campo sem disparar eventos
      this.form.get('cpf')?.setValue(maskedValue, { emitEvent: false });
    }
  }

  hasError(controlName: string, errorName: string): boolean {
    const control = this.form.get(controlName);
    return control?.hasError(errorName) && (control.touched || control.dirty);
  }
  // Validador de CPF
  cpfValidator(control: FormControl) {
    const cpf = control.value.replace(/\D/g, '');
    if (!cpf || cpf.length !== 11 || /^(.)\1{10}$/.test(cpf)) {
      return { invalidCpf: true };
    }
    let sum = 0;
    let remainder;
    for (let i = 1; i <= 9; i++) {
      sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) {
      remainder = 0;
    }
    if (remainder !== parseInt(cpf.substring(9, 10))) {
      return { invalidCpf: true };
    }
    sum = 0;
    for (let i = 1; i <= 10; i++) {
      sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) {
      remainder = 0;
    }
    if (remainder !== parseInt(cpf.substring(10, 11))) {
      return { invalidCpf: true };
    }
    return null;
  }
}
