import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SistemaFinanceiro } from 'src/app/models/SistemaFinanceiro';
import { SistemaService } from 'src/app/services/sistema.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sistema-form',
  templateUrl: './sistema-form.component.html',
  styleUrls: ['./sistema-form.component.scss']
})


export class SistemaFormComponent implements OnInit {
  Sistema: SistemaFinanceiro;
  public form!: FormGroup;
  public formValido: boolean = true;
  gerarCopiaDespesa = 'accent';
  checked = false;
  disabled = false;

  constructor(private formBuilder: FormBuilder, private sistemaService: SistemaService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  
    this.form = this.formBuilder.group
      (
        {
          nome:['', [Validators.required]], 
          mes: ['', [Validators.required]], 
          ano: ['', [Validators.required]], 
          diaFechamento: ['', [Validators.required]], 
        }
      )
  }

  handleChangeCopia(item: any) {
    this.checked = item.checked as boolean;
  }

  public salvar(): void {
    if (this.form.valid) {
      const novoSistema: SistemaFinanceiro = {
        Nome: this.form.value.nome,
        id: 0,
        Mes: this.form.value.mes,
        Ano: this.form.value.ano,
        DiaFechamento: this.form.value.DiaFechamento,
        GerarCopiaDespesa: true,
        MesCopia: this.form.value.mesCopia,
        AnoCopia: this.form.value.anoCopia,
      };

      //Ajustado adicionar SistemaFinanceiro
      this.sistemaService.AdicionarSistemaFinanceiro(novoSistema).subscribe(
        (response: any) => {
          const sistemaFinanceiro: SistemaFinanceiro = response.dados;
          console.error('SistemaFianceiro:' + sistemaFinanceiro.id);

          this.sistemaService.CadastrarUsuarioNoSistema(sistemaFinanceiro.id, this.authService.getEmailUser()).subscribe(
            () => {
              this.sistemaService.showMessage('Sistema Financeiro criado com sucessossssssss!');
              this.router.navigate(['Sistema/tabela']); // Navega para outra rota após o sucesso
            },
            (error) => {
              console.error(error);
              this.sistemaService.showMessage('Erro ao criar Sistema Financeiro.', true); // true indica que é um erro
            }
          );
        },
        (error) => {
          console.error(error);
          this.sistemaService.showMessage('Erro ao adicionar o Sistema Financeiro.', true); // true indica que é um erro
        }
      );
    }
  }
}

