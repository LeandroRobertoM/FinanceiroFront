import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Categoria } from 'src/app/models/Categoria';
import { CategoriaService } from 'src/app/services/categoria.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-categoria-form',
  templateUrl: './categoria-form.component.html',
  styleUrls: ['./categoria-form.component.scss']
})
export class CategoriaFormComponent implements OnInit{
  categoria: Categoria;
  public form!:FormGroup;
  public formValido:boolean=true;

  constructor(
    private formBuilder: FormBuilder,
    private categoriaService: CategoriaService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nome: [null, [Validators.required, Validators.minLength(3)]],
      IdSistema: [null, [Validators.required, Validators.minLength(3)]],
      // Adicione outros campos do formulário aqui, se houver
    });
  }

  public salvar(): void {
    if (this.form.valid) {
      const novaCategoria: Categoria = {
        Nome: this.form.value.nome,
        IdSistema: this.form.value.IdSistema, // Atualizado para capturar o valor de IdSistema
        // Adicione outras propriedades da Categoria aqui, se houver
      };

      this.categoriaService.AdicionarCategoria(novaCategoria).subscribe(
        () => {
          this.categoriaService.showMessage('Categoria criada com sucesso!');
          this.router.navigate(['/products']);
        },
        (error) => {
          console.error(error);
          this.categoriaService.showMessage('Erro ao criar a Categoria.', true); // true indica que é um erro
        }
      );
    }
  }
}

