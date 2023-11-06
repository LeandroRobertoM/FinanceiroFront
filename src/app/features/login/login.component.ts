import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { navbarData } from 'src/app/sidenav/nav-data'; // 
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
    public authService: AuthService) {

    } 

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required]]
    });
  }

  get dadosForm() {
    return this.loginForm.controls;
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log('Entrou no Onsubmit.');
      this.loginUser();
    }
  }

  loginUser() {
    console.log('EntrouLoginUser');
    this.loginService.login(this.loginForm.value.email, this.loginForm.value.senha).subscribe(
      token => {
        alert(token);
        alert(token);
        
        console.log('Entrou no Token.');
        
        // Defina isAuthenticated como true após um login bem-sucedido
        this.authService.UsuarioAutenticado(true);
        
        console.log('Valor da variável UsuarioAutenticado:', this.authService.UsuarioAutenticado);

        this.router.navigate(['Sistema/formulario']);
      },
      err => {
        console.error('Erro ao fazer login:', err); // Log detalhado do erro
  
        // Verifique se o erro inclui uma mensagem de erro específica
        if (err.error && err.error.message) {
          console.error('Mensagem de erro:', err.error.message);
        }
  
        // Verifique o código de status HTTP do erro
        if (err.status === 401) {
          alert('Credenciais inválidas. Verifique seu e-mail e senha.');
        } else if (err.status === 500) {
          alert('Ocorreu um erro no servidor. Por favor, tente novamente mais tarde.');
        } else {
          alert('Ocorreu um erro desconhecido. Por favor, entre em contato com o suporte.');
        }
      }
    );
  } 
}
