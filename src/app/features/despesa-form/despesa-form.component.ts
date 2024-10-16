import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { CategoriaService } from 'src/app/services/categoria.service';
import { DespesaService } from 'src/app/services/despesa.service';
import { AuthService } from 'src/app/services/auth.service';
import { SelectModel } from 'src/app/models/SelectModel';
import { Despesa } from 'src/app/models/Despesa';
import { DespesaRecorrenteDialogComponent } from '../despesa/despesa-recorrente-dialog/despesa-recorrente-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { DataFormatada } from 'src/app/models/DataFormatada';
import { DespesaParcelas } from 'src/app/models/DespesaParcelas';
import { tap } from 'rxjs';
import { CustomSnackbarService } from 'src/app/components/CustomSnackbarService/custom-snackbar/custom-snackbar.service';

@Component({
  selector: 'app-despesa-form',
  templateUrl: './despesa-form.component.html',
  styleUrls: ['./despesa-form.component.scss']
})
export class DespesaFormComponent implements OnInit, AfterViewInit {
  Despesa: Despesa;
  public form!: FormGroup;
  public formValido: boolean = true;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  lisCategoriaSistemas = new Array<SelectModel>();
  categoriaSelect = new SelectModel();
  color = 'accent';
  checked = false;
  disabled = false;
  despesaRecorrenteLista: DespesaParcelas[] = [];
  displayedColumns: string[] = ['idDespesa', 'nome', 'dataInicio', 'frequencia', 'valorParcela', 'categoria', 'status', 'action'];
  dataSource = new MatTableDataSource<DespesaParcelas>(this.despesaRecorrenteLista);
  totalDespesa: number = 0; // Variável para armazenar o total

  constructor(
    private formBuilder: FormBuilder,
    private despesaService: DespesaService,
    private categoriaService: CategoriaService,
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog,
    public customSnackbarService: CustomSnackbarService
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

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    // Subscribing to paginator changes
    this.paginator.page
      .pipe(tap(() => this.loadPaginatedData()))
      .subscribe();
  }

  loadPaginatedData(): void {
    const paginatedData = this.despesaRecorrenteLista.slice(
      this.paginator.pageIndex * this.paginator.pageSize,
      (this.paginator.pageIndex + 1) * this.paginator.pageSize
    );
    this.dataSource.data = paginatedData;
  }

  public salvar(): void {
    if (this.form.valid) {
      const novaDespesa: Despesa = {
        nome: this.form.value.nome,
        valor: this.form.value.valor,
        categoriaId: parseInt(this.form.value.categoria),
        dataVencimento: new Date(this.form.get('data')?.value),
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
      console.log('Checkbox marcado, abrindo diálogo de despesa recorrente.');
  
      const dialogRef = this.dialog.open(DespesaRecorrenteDialogComponent, {
        width: '400px',
        data: { formData: this.form.value }
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          console.log('Diálogo fechado com resultado:', result);
  
          const quantidadeParcelas = result.quantidadeParcelas; // Supondo que o dialog retorne o número de parcelas
          const valorParcela = result.valorParcela;
  
          console.log(`Quantidade de parcelas: ${quantidadeParcelas}, Valor da parcela: ${valorParcela}`);
  
          // Limpa a lista antes de adicionar novas parcelas
          this.despesaRecorrenteLista = [];
  
          for (let i = 0; i < quantidadeParcelas; i++) {
            const dataFormatada = this.adicionarMeses(result.dataInicio, i); 
            const newDespesa: DespesaParcelas = {
              idDespesa: this.despesaRecorrenteLista.length + 1, // Gera um ID simples
              nome: result.descricao,
              valorParcela: valorParcela, // Valor da parcela
              dataInicio: dataFormatada.data, 
              frequencia: result.frequencia,
              categoria: result.categoria,
              status: result.status
            };
  
            console.log(`Adicionando despesa ${i + 1}:`, newDespesa);
            this.despesaRecorrenteLista.push(newDespesa); // Adiciona cada parcela à lista de despesas recorrentes
  
            // Atualiza dataSource
            this.dataSource.data = this.despesaRecorrenteLista;
  
            // Atualiza paginator
            this.dataSource.paginator = this.paginator;
          }
  
          console.log('Lista de despesas recorrentes após adicionar:', this.despesaRecorrenteLista);
          this.atualizarTotalDespesa();
          this.form.patchValue({ despesaRecorrente: true }); // Atualiza o controle do formulário
  
          const dataVencimento = this.despesaRecorrenteLista[0]?.dataInicio;
          if (dataVencimento) {
            const dataFormatada = this.formatarData(dataVencimento);
            console.log('Data de vencimento atualizada:', dataFormatada);
            
            // Converte a data para o formato adequado (YYYY-MM-DD) sem problemas de fuso horário
            const dataLocal = new Date(dataVencimento.getTime() - dataVencimento.getTimezoneOffset() * 60000)
                .toISOString()
                .split('T')[0];
            
            this.form.get('data')?.setValue(dataLocal); // Define a data formatada no input
          }
  
        } else {
          console.log('Diálogo fechado sem resultado.');
        }
      });
    } else {
      this.confirmarLimpeza();
    }
  }
  
  formatarData(data: Date): string {
    const dia = `${data.getDate()}`.padStart(2, '0');
    const mes = `${data.getMonth() + 1}`.padStart(2, '0'); // Mês ajustado
    const ano = data.getFullYear();
    return `${dia}/${mes}/${ano}`;
  }
  
  confirmarLimpeza(): void {
    if (confirm('Você tem certeza que deseja desmarcar "Despesa Recorrente"? Isso irá limpar a lista de parcelas.')) {
      this.despesaRecorrenteLista = [];
      this.dataSource.data = this.despesaRecorrenteLista;
      this.atualizarTotalDespesa();
    } else {
      this.form.patchValue({ despesaRecorrente: true }); // Mantém o checkbox marcado
    }
  }
  
  editarDespesaRecorrente(despesa: DespesaParcelas): void {
    const dialogRef = this.dialog.open(DespesaRecorrenteDialogComponent, {
      width: '400px',
      data: despesa // Passa a despesa selecionada para o diálogo
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Atualiza a despesa na lista com os dados retornados do diálogo
        const index = this.despesaRecorrenteLista.findIndex(d => d.idDespesa === despesa.idDespesa);
        if (index !== -1) {
          this.despesaRecorrenteLista[index] = result; // Atualiza a despesa
          this.dataSource.data = this.despesaRecorrenteLista; // Atualiza a fonte de dados da tabela
          this.atualizarTotalDespesa(); // Atualiza o total de despesas
          this.customSnackbarService.openSnackBar('Despesa editada com sucesso!', 'success');
        }
      }
    });
  }

  excluirDespesaRecorrente(despesa: DespesaParcelas): void {
    const confirmar = confirm('Deseja excluir essa despesa recorrente?'); 
    if (confirmar) {
      const index = this.despesaRecorrenteLista.indexOf(despesa);
      if (index >= 0) {
        this.despesaRecorrenteLista.splice(index, 1); // Remove a despesa da lista
        this.dataSource.data = this.despesaRecorrenteLista; // Atualiza a fonte de dados da tabela
        this.atualizarTotalDespesa(); // Atualiza o total de despesas
        
        // Mensagem de sucesso
        this.customSnackbarService.openSnackBar('Despesa excluída com sucesso!', 'success');
      }
    }
  }

  adicionarMeses(data: Date, meses: number): DataFormatada {
    const novaData = new Date(data);
    novaData.setMonth(novaData.getMonth() + meses);
  
    return {
      data: novaData,
      dataFormatada: this.formatarData(novaData)
    };
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

  atualizarTotalDespesa(): void {
    this.totalDespesa = this.despesaRecorrenteLista.reduce((acc, parcela) => acc + Number(parcela.valorParcela), 0);
  }

  handleChangePago(item: any) {
    this.checked = item.checked as boolean;
  }

  cancelar() {
    this.router.navigate(['Despesa/tabela']);
  }
}
