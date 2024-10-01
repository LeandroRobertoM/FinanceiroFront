import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Categoria } from 'src/app/models/Categoria';
import { CategoriaService } from 'src/app/services/categoria.service';
import { SistemaService } from 'src/app/services/sistema.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SistemaFinanceiro } from 'src/app/models/SistemaFinanceiro';
import { SelectModel } from 'src/app/models/SelectModel';
import { CustomSnackbarService } from 'src/app/components/CustomSnackbarService/custom-snackbar/custom-snackbar.service';


@Component({
  selector: 'app-categoria-form',
  templateUrl: './categoria-form.component.html',
  styleUrls: ['./categoria-form.component.scss']
})
export class CategoriaFormComponent implements OnInit{
  categoria: Categoria;
  public form!:FormGroup;
  public  :boolean=true;
  

  constructor(
    private formBuilder: FormBuilder,
    private categoriaService: CategoriaService,
    private SistemaService:SistemaService,
    private authService: AuthService,
    private router: Router,
    public customSnackbarService: CustomSnackbarService
  ) {
   
  }

  listSistemas = new Array<SelectModel>();
  sistemaSelect = new SelectModel();

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nome: [null, [Validators.required, Validators.minLength(3)]],
      sistema: ['', Validators.required], 
      sistemaSelect: [null] 
    }
    );
    this.ListaSistemaUsuario();
  
  }

  public salvar(): void {
    if (this.form.valid) {
      const novaCategoria: Categoria = {
        nome: this.form.value.nome,
        idSistemaFinanceiro: parseInt(this.form.value.sistema),
        
        // Atualizado para capturar o valor de IdSistema
        // Adicione outras propriedades da Categoria aqui, se houver
      };

      this.categoriaService.AdicionarCategoria(novaCategoria).subscribe(
        (response: any) => {
          const categoria: Categoria = response.dados;
          this.customSnackbarService.openSnackBar('Verifique o seu E-mail, para criar nova senha!', 'success');
          this.router.navigate(['Categoria/tabela']);
        },
        (error) => {
          console.error(error);
          this.customSnackbarService.openSnackBar('Erro efetuar registro registrar', error); // true indica que é um erro
        }
      );
    }
  }

  ListaSistemaUsuarios() {
    this.SistemaService.ListaSistemaUsuario(this.authService.getEmailUser())
      .subscribe(
        (response: Array<SistemaFinanceiro>) => {
          console.log(response);
          var listSistemas = response.map((sistema) => {
            var item = new SelectModel();
            item.id = sistema.id.toString();
            item.name = sistema.nome;
            console.log('Nome do Sistema:', sistema.nome);
            return item;
          });
  
          this.listSistemas = listSistemas;
          console.log('Sistemas:', this.listSistemas);
        },
        (error) => {
          console.error('Erro ao carregar os sistemas:', error); // Tratamento de erro
        }
      );
  }
  

  ListaSistemaUsuario() {
    this.SistemaService.ListaSistemaUsuario(this.authService.getEmailUser())
      .subscribe(
        (reponse: Array<SistemaFinanceiro>) => {
          console.log(reponse);
          var lisSistemaFinanceiro = [];
          reponse.forEach(x => {
            var item = new SelectModel();
            item.id = x.id.toString();
            item.name = x.nome;
            console.log('Nome do Sistema:', x.nome);
            lisSistemaFinanceiro.push(item);
          });
  
          this.listSistemas = lisSistemaFinanceiro;
          console.log('Testes'+this.listSistemas);
        },
        (error) => {
          console.error('Erro ao carregar os sistemas:', error); // Tratamento de erro
        }
      );
  } 
}
