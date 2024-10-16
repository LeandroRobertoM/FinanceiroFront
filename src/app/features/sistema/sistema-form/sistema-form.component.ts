import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SistemaFinanceiro } from 'src/app/models/SistemaFinanceiro';
import { SistemaService } from 'src/app/services/sistema.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { CustomSnackbarService } from 'src/app/components/CustomSnackbarService/custom-snackbar/custom-snackbar.service';


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

  constructor(private formBuilder: FormBuilder, private sistemaService: SistemaService, private authService: AuthService, private router: Router,public customSnackbarService: CustomSnackbarService) { }

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

      this.sistemaService.AdicionarSistemaFinanceiro(novoSistema).subscribe(
        (response: any) => {
          const sistemaFinanceiro: SistemaFinanceiro = response.dados;
          console.error('SistemaFianceiro:' + sistemaFinanceiro.id);

          this.sistemaService.CadastrarUsuarioNoSistema(sistemaFinanceiro.id, this.authService.getEmailUser()).subscribe(
            () => {
              this.customSnackbarService.openSnackBar('Registro Efetuado com Sucesso', 'success');
              this.router.navigate(['Sistema/tabela']); 
            },
            (error) => {
              console.error(error);
              this.customSnackbarService.openSnackBar('Erro efetuar registro registrar', error);
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
}

