import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { navbarData } from 'src/app/sidenav/nav-data';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  navbarData = navbarData;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loginService: LoginService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required]]
    });
  }

  get dadosForm() {
    return this.loginForm.controls;
  }

  async loginUser() {
    console.log('EntrouLoginUser');

    try {
      const token = await this.loginService.login(this.loginForm.value.email, this.loginForm.value.senha).toPromise();
      console.log('Entrou no Token:', token);

      // Defina isAuthenticated como true após um login bem-sucedido
      this.authService.UsuarioAutenticado(true);

      console.log('Valor da variável UsuarioAutenticado:', await this.authService.UsuarioEstaAutenticado());

      this.router.navigate(['/dashboard']);
    } catch (err) {
      console.error('Erro ao fazer login:', err);

      if (err.error && err.error.message) {
        console.error('Mensagem de erro:', err.error.message);
      }

      if (err.status === 401) {
        alert('Credenciais inválidas. Verifique seu e-mail e senha.');
      } else if (err.status === 500) {
        alert('Ocorreu um erro no servidor. Por favor, tente novamente mais tarde.');
      } else {
        alert('Ocorreu um erro desconhecido. Por favor, entre em contato com o suporte.');
      }
    }
  }
}
