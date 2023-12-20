import { Component,OnInit } from '@angular/core';
import { FormControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  constructor(private formBuilder: FormBuilder, private sistemaService: SistemaService, private authService: AuthService, private router: Router) {}

 // sistemaForm: FormGroup;

  ngOnInit():void {

    this.form = this.formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(3)]],
      // Adicione outros campos do formulário aqui, se houver
    });
  /*
    this.sistemaForm = this.formBuilder.group
      (
        {
          name: ['', [Validators.required]]
        }
      )*/


  }


 /* dadorForm() {
    return this.sistemaForm.controls;
  }
  */
  public salvar(): void {
    if (this.form.valid) {
      const novoSistema: SistemaFinanceiro = {
        Nome: this.form.value.name,
        id:0,
        Mes:0,
        Ano:0,
        DiaFechamento:0,
        GerarCopiaDespesa:true,
        MesCopia:0,
        AnoCopia:0,

      };

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



  /*enviar() {
    const dados = this.dadorForm();
    const item = new SistemaFinanceiro();
    item.Nome = dados["name"].value;
    item.id = 0;
    item.Mes = 0;
    item.Ano = 0;
    item.DiaFechamento = 0;
    item.GerarCopiaDespesa = true;
    item.MesCopia = 0;
    item.AnoCopia = 0;
  
    this.sistemaService.AdicionarSistemaFinanceiro(item).subscribe(
      (response: any) => {
        const sistemaFinanceiro: SistemaFinanceiro = response.dados;
        console.error('SistemaFianceiro:' + sistemaFinanceiro.id);
  
        this.sistemaService.CadastrarUsuarioNoSistema(sistemaFinanceiro.id, "leandro.machados@ndd.com.br").subscribe(
          () => {
            this.sistemaService.showMessage('Sistema Financeiro criado com sucesso!');
            // Navega para outra rota ou executa outra ação, se necessário
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
  }*/
}