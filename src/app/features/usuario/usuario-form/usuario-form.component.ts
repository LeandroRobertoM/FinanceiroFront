import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from 'src/app/models/UsuarioModel';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.scss']
})
export class UsuarioFormComponent implements OnInit {

  public form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      cpf: ['', [Validators.required]], 
      email: ['', [Validators.required]], 
      senha: ['', [Validators.required]], 
    });
  }

  salvar(): void {
    if (this.form.valid) {
      const novoUsuario: UsuarioModel = {
        Email: this.form.value.email,
        CPF: this.form.value.cpf,
        Senha: this.form.value.senha
        // Se houver um campo 'nome', adicione-o aqui
      };

      this.userService.adicionarUsuario(novoUsuario).subscribe(
        (response: any) => {
          const usuariomodel: UsuarioModel = response.dados;
          this.userService.showMessage('Usuário criado com sucesso!');
          this.router.navigate(['/products']);
        },
        (error) => {
          console.error(error);
          this.userService.showMessage('Erro ao criar o usuário.', true);
        }
      );
    }
  }
}
