import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { navbarData } from 'src/app/sidenav/nav-data';
import { AuthService } from 'src/app/services/auth.service';
import { UserForAuthenticationDto } from 'src/app/models/user/UserForAuthenticationDto';
import { AuthResponseDto } from 'src/app/models/response/AuthResponseDto';
import { authenticationservice } from 'src/app/services/authentication.service'; // Corrigido para a nomenclatura correta
import { HttpErrorResponse } from '@angular/common/http';
import { CustomSnackbarService } from 'src/app/components/CustomSnackbarService/custom-snackbar/custom-snackbar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  navbarData = navbarData;
  private returnUrl: string;
  errorMessage: string = '';
  showError: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loginService: LoginService,
    public authService: AuthService,
    private authenticationservice: authenticationservice,
    private route: ActivatedRoute,
    private customSnackbarService: CustomSnackbarService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required]]
    });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  esqueceuSenha() {
    // Redirecionar para a página de "Esqueceu a senha"
    console.log('Método esqueceuSenha() foi chamado agora.');
    this.authService.forgotPassword(true);
    this.router.navigate(['authentication/ForgotPassword']);
   
  }

  registrar() {
    // Adicione um log para verificar se o método está sendo chamado corretamente
    console.log('Método registrar() foi chamado.');
  
    this.authService.registerUser(true);
    this.router.navigate(['login/registrar']);
  }

  get dadosForm() {
    return this.loginForm.controls;
  }

  loginUser2 = async (loginFormValue) => {
    this.showError = false;
    const login = { ...loginFormValue };

    const userForAuth: UserForAuthenticationDto = {
        email: login.email,
        password: login.senha
    };

    try {
        const res: AuthResponseDto = await this.authenticationservice.loginUser('UsuarioLogin', userForAuth).toPromise();

        if (res.isAuthSuccessful) {
            localStorage.setItem("token", res.token);
            this.authService.setToken(res.token);
            this.authService.setEmailUser(this.loginForm.value.email);

            // Define isAuthenticated como true após um login bem-sucedido
            this.authService.UsuarioAutenticado(true);

            console.log('Valor da variável UsuarioAutenticado:', await this.authService.UsuarioEstaAutenticado());

            // Navega para o dashboard
            this.router.navigate(['dashboard']);
        } else {
            // Lida com o caso onde isAuthSuccessful é false
           
            this.customSnackbarService.openSnackBar(res.errorMessage || 'Erro na autenticação.', 'error');
        }
    } catch (err) {
        // Caso realmente seja um erro HTTP, trate-o aqui
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

        this.errorMessage = err.message;
        this.showError = true;
        console.log('Erro HTTP:', this.errorMessage);
    }
}
  

  async loginUser() {
    console.log('EntrouLoginUser');

    try {
      const token = await this.loginService.login(this.loginForm.value.email, this.loginForm.value.senha).toPromise();
      console.log('Entrou no Token:', token);

      //Difine o valor settar o token 
      this.authService.setToken(token);
      this.authService.setEmailUser(this.loginForm.value.email);

      // Defina isAuthenticated como true após um login bem-sucedido
      this.authService.UsuarioAutenticado(true);

      console.log('Valor da variável UsuarioAutenticado:', await this.authService.UsuarioEstaAutenticado());

      // testess
      this.router.navigate(['dashboard']);
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
