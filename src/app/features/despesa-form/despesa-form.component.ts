import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoriaService } from 'src/app/services/categoria.service';
import { DespesaService } from 'src/app/services/despesa.service';
import { AuthService } from 'src/app/services/auth.service';
import { SelectModel } from 'src/app/models/SelectModel';
import { Despesa } from 'src/app/models/Despesa';
import { DespesaRecorrenteDialogComponent } from '../despesa/despesa-recorrente-dialog/despesa-recorrente-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-despesa-form',
  templateUrl: './despesa-form.component.html',
  styleUrls: ['./despesa-form.component.scss']
})
export class DespesaFormComponent implements OnInit {
  Despesa: Despesa;
  public form!: FormGroup;
  public formValido: boolean = true;
  
  lisCategoriaSistemas = new Array<SelectModel>();
  categoriaSelect = new SelectModel();
  color = 'accent';
  checked = false;
  disabled = false;
  dataSource: any[] = []; // Sua fonte de dados inicial
  displayedColumns: string[] = ['idParcelas', 'nome', 'valor', 'action'];

  // Adiciona a lista de despesas recorrentes
  despesaRecorrenteLista: any[] = []; // Lista para armazenar as despesas recorrentes

  constructor(
    private formBuilder: FormBuilder,
    private despesaService: DespesaService,
    private categoriaService: CategoriaService,
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nome: ['', [Validators.required]],
      valor: ['', [Validators.required]],
      data: ['', [Validators.required]],
      categoria: ['', [Validators.required]],
      despesaRecorrente: [false] // Adiciona o controle para despesa recorrente
    });
    this.ListaCategoriaUsuario();
  }

public salvar(): void {
  if (this.form.valid) {
    const novaDespesa: Despesa = {
      nome: this.form.value.nome,
      valor: this.form.value.valor,
      categoriaId: parseInt(this.form.value.categoria),
      dataVencimento: this.form.get('data')?.value,
      pago: this.checked,
      tipoDespesa: 1
    };

    // Salva a despesa e as despesas recorrentes se houver
    this.despesaService.AdicionarDespesa(novaDespesa).subscribe(
      (response: any) => {
        this.despesaService.showMessage('Despesa criada com sucesso!');
        this.router.navigate(['Despesa/tabela']); // Redireciona após salvar
      },
      (error) => {
        console.error(error);
        this.despesaService.showMessage('Erro ao criar a despesa.', true);
      }
    );

    // Se a despesa recorrente estiver selecionada, você já está adicionando as parcelas
    if (this.form.value.despesaRecorrente && this.despesaRecorrenteLista.length > 0) {
      console.log('Despesas Recorrentes:', this.despesaRecorrenteLista);
      // Aqui você pode implementar o código para salvar as parcelas de despesas recorrentes, se necessário
    }
  }
}

  openDespesaRecorrenteDialog(isChecked: boolean): void {
    if (isChecked) {
      const dialogRef = this.dialog.open(DespesaRecorrenteDialogComponent, {
        width: '400px',
        data: { formData: this.form.value }
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          const newDespesa = {
            idDespesa: this.despesaRecorrenteLista.length + 1, // Gera um ID simples para demonstração
            nome: result.descricao,
            valorParcela: result.valorParcela,
            dataInicio: result.dataInicio,
            frequencia: result.frequencia,
            // Adicione outros campos conforme necessário
          };
          this.despesaRecorrenteLista.push(newDespesa); // Adiciona à lista de despesas recorrentes
          this.form.patchValue({ despesaRecorrente: true }); // Atualiza o controle do formulário
        }
      });
    }
  }

  ListaCategoriaUsuario() {
    this.categoriaService.ListaCategoriaSistemas(this.authService.getEmailUser())
      .subscribe(
        (response: any[]) => {
          this.lisCategoriaSistemas = response.map(x => {
            const item = new SelectModel();
            item.id = x.idCategoria;
            item.name = x.nome;
            return item;
          });
        },
        (error) => {
          console.error('Erro ao carregar as categorias:', error);
        }
      );
  }

  handleChangePago(item: any) {
    this.checked = item.checked as boolean;
  }

  cancelar() {
    this.router.navigate(['Despesa/tabela']);
  }
}
