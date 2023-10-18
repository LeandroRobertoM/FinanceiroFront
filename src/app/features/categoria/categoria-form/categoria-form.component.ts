import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ICategoria } from '../Categoria.model';
import { categoriaService } from 'src/app/services/categoria.service';

@Component({
  selector: 'app-categoria-form',
  templateUrl: './categoria-form.component.html',
  styleUrls: ['./categoria-form.component.scss']
})
export class CategoriaFormComponent {
  categoria: ICategoria;
  public form!: FormGroup;
  public formValido: boolean = true;

  constructor(private categoriaService: categoriaService, private router: Router) { }

  public ngOnInit(): void {

    this.form = new FormGroup({
      nome: new FormControl (null, [Validators.required, Validators.minLength(3)]),
      
    });
  }


public salvar(): void {
  if (this.form.valid) {
    const novoCategoria: ICategoria = {
      nome: this.form.value.nome
  
    };

    this.categoriaService.salvarCliente(novoCategoria).subscribe(() => {
      this.categoriaService.showMessage('Categoria criado com sucesso!')
      this.router.navigate(['/products'])
  })
 }
}
}
