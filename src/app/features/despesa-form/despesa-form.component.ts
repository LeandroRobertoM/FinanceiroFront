import { Component, OnInit } from '@angular/core';
import { Categoria } from 'src/app/models/Categoria';
import { Router } from '@angular/router';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { DespesaService } from 'src/app/services/despesa.service';
import { CategoriaService } from 'src/app/services/categoria.service';
import { SelectModel } from 'src/app/models/SelectModel';
import { AuthService } from 'src/app/services/auth.service';
import { Despesa } from 'src/app/models/Despesa';


@Component({
  selector: 'app-despesa-form',
  templateUrl: './despesa-form.component.html',
  styleUrls: ['./despesa-form.component.scss']
})
export class DespesaFormComponent implements OnInit {
  Despesa: Despesa;
  public form!: FormGroup;
  public formValido: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private DespesaService: DespesaService,
    private CategoriaService: CategoriaService,
    private authService: AuthService,
    private router: Router
  ) {

  }

  lisCategoriaSistemas= new Array<SelectModel>();
  categoriaSelect = new SelectModel();
  color = 'accent';
  checked = false;
  disabled = false;

  
  ngOnInit() :void{

    this.form = this.formBuilder.group
      (
        {
          nome: ['', [Validators.required]], 
          valor: ['', [Validators.required]], 
          data: ['', [Validators.required]], 
          categoria: ['', [Validators.required]], 
        }
      )
      this.ListaCategoriaUsuario();
  }

  public salvar(): void {
    if (this.form.valid) {
      const novaDespesa : Despesa = {
        nome: this.form.value.nome,
        valor: this.form.value.valor,
        categoriaId: parseInt(this.form.value.categoria),
        dataVencimento: this.form.get('data')?.value,
        pago:this.checked,
        tipoDespesa:1,
       
        
        // Atualizado para capturar o valor de IdSistema
        // Adicione outras propriedades da Categoria aqui, se houver
      };
  
      this.DespesaService.AdicionarDespesa(novaDespesa).subscribe(
        (response: any) => {
          const categoria: Despesa = response.dados;
          this.DespesaService.showMessage('Categoria criada com sucesso!');
          this.router.navigate(['Despesa/tabela']);
        },
        (error) => {
          console.error(error);
          this.DespesaService.showMessage('Erro ao criar a Categoria.', true); // true indica que é um erro
        }
      );
    }
  }
  

  ListaCategoriaUsuario() {
    this.CategoriaService.ListaCategoriaSistemas(this.authService.getEmailUser())
      .subscribe(
        (response: any[]) => {
          console.log(response);
          const lisCategoriaSistemas = response.map(x => {
            const item = new SelectModel();
            item.id = x.idCategoria;
            item.name = x.nome;
            console.log('Categorias para Colocar na Lista:', x.nome);
            return item;
          });
  
          this.lisCategoriaSistemas = lisCategoriaSistemas;
          console.log('Sistemas:', this.lisCategoriaSistemas);
        },
        (error) => {
          console.error('Erro ao carregar os sistemas:', error);
        }
      );
  }

  handleChangePago(item: any) {
    this.checked = item.checked as boolean;
  }
  
  }


