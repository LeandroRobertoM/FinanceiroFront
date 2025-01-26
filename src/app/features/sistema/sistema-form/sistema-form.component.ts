import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SistemaFinanceiro } from 'src/app/models/SistemaFinanceiro';
import { SistemaService } from 'src/app/services/sistema.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { CustomSnackbarService } from 'src/app/components/CustomSnackbarService/custom-snackbar/custom-snackbar.service';
import { MatDatepicker } from '@angular/material/datepicker';

@Component({
  selector: 'app-sistema-form',
  templateUrl: './sistema-form.component.html',
  styleUrls: ['./sistema-form.component.scss']
})

export class SistemaFormComponent implements OnInit {
  Sistema: SistemaFinanceiro;
  public form!: FormGroup;
  public erroAnoBase: string | null = null;
  public anosDisponiveis: number[] = [];

  @ViewChild('picker') picker: MatDatepicker<any>;

  constructor(
    private formBuilder: FormBuilder,
    private sistemaService: SistemaService,
    private authService: AuthService,
    private router: Router,
    public customSnackbarService: CustomSnackbarService
  ) { }

  ngOnInit(): void {
    const hoje = new Date();
    const dataAtual = hoje.toISOString().split('T')[0]; // Formato: 'YYYY-MM-DD'
    this.form = this.formBuilder.group({
      nome: ['', [Validators.required]],
      dataCadastro: [dataAtual], // Data atual no formato correto
      anoBase: ['', [Validators.required]], // Agora é um campo de seleção
      ativo: [true],
      metaAnual: ['', Validators.required],
    });

    // Preencher anosDisponiveis com os anos do intervalo desejado
    this.gerarAnosDisponiveis();
  }

  salvar(): void {
    // Verifica a validação do ano base antes de salvar
    if (this.erroAnoBase) {
      return; // Impede o envio do formulário se o ano não for válido
    }

    if (this.form.valid) {
      // Antes de salvar, ajustamos o ano base para '01/01/{anoBase}'
      const anoBase = this.form.value.anoBase;
      const anoBaseComData = `${anoBase}-01-01`;  // Formato 'YYYY-01-01'
      
      const novoSistema: SistemaFinanceiro = {
        nome: this.form.value.nome,
        id: 0,
        dataCadastro: this.form.value.dataCadastro, // Campo dataCadastro não muda
        anoBase: anoBaseComData,  // Salvamos o ano base com a data ajustada
        ativo: this.form.value.ativo,
        metaAnual: this.form.value.metaAnual,
      };

      this.sistemaService.AdicionarSistemaFinanceiro(novoSistema).subscribe(
        (response: any) => {
          const sistemaFinanceiro: SistemaFinanceiro = response.dados;
          console.log('SistemaFinanceiro:' + sistemaFinanceiro.id);

          this.sistemaService.CadastrarUsuarioNoSistema(sistemaFinanceiro.id, this.authService.getEmailUser()).subscribe(
            () => {
              this.customSnackbarService.openSnackBar('Registro Efetuado com Sucesso', 'success');
              this.router.navigate(['Sistema/tabela']);
            },
            (error) => {
              console.error(error);
              this.customSnackbarService.openSnackBar('Erro ao efetuar registro', error);
            }
          );
        },
        (error) => {
          console.error(error);
          this.customSnackbarService.openSnackBar('Serviço não disponível!', error);
        }
      );
    }
  }

  // Função para gerar a lista de anos disponíveis (últimos 10 anos até o atual)
  gerarAnosDisponiveis(): void {
    const anoAtual = new Date().getFullYear();
    const anoMinimo = anoAtual - 10;
    this.anosDisponiveis = [];
    for (let ano = anoAtual; ano >= anoMinimo; ano--) {
      this.anosDisponiveis.push(ano);
    }
  }

  // Função para atualizar o ano base, mantendo a estrutura correta '01/01/{anoBase}'
  setYear(event: any): void {
    const anoBase = event.getFullYear();  // Pega o ano selecionado pelo usuário
    this.form.get('anoBase')?.setValue(anoBase);  // Atualiza o campo anoBase com o ano
  }

  // Função para abrir o picker de ano
  openYearPicker(): void {
    this.picker.open();  // Abre o calendário de ano
  }

  // Função para validar o ano selecionado
  validarAnoBaseNoEvento(): void {
    const anoBase = this.form.get('anoBase')?.value;
    const anoAtual = new Date().getFullYear();
    const anoMinimo = anoAtual - 10;

    if (anoBase < anoMinimo || anoBase > anoAtual) {
      this.erroAnoBase = `O ano base deve estar entre ${anoMinimo} e ${anoAtual}.`;
    } else {
      this.erroAnoBase = null; // Limpa o erro se o ano for válido
    }
  }
}
