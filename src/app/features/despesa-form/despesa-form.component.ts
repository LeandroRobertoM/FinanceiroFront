import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoriaService } from 'src/app/services/categoria.service';
import { DespesaService } from 'src/app/services/despesa.service';
import { AuthService } from 'src/app/services/auth.service';
import { SelectModel } from 'src/app/models/SelectModel';
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

  lisCategoriaSistemas = new Array<SelectModel>();
  categoriaSelect = new SelectModel();
  color = 'accent';
  checked = false;
  disabled = false;

  constructor(
    private formBuilder: FormBuilder,
    private despesaService: DespesaService,
    private categoriaService: CategoriaService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nome: ['', [Validators.required]],
      valor: ['', [Validators.required]],
      data: ['', [Validators.required]],
      categoria: ['', [Validators.required]]
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

      this.despesaService.AdicionarDespesa(novaDespesa).subscribe(
        (response: any) => {
          this.despesaService.showMessage('Despesa criada com sucesso!');
          this.router.navigate(['Despesa/tabela']);
        },
        (error) => {
          console.error(error);
          this.despesaService.showMessage('Erro ao criar a despesa.', true);
        }
      );
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