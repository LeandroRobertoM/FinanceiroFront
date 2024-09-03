import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ForgotPasswordDto } from 'src/app/models/user/ForgotPasswordDto';
import { authenticationservice } from 'src/app/services/authentication.service';
import { Location } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';
import { ForgotResponseDto } from 'src/app/models/response/ForgotResponseDto';
import { CustomSnackbarService } from 'src/app/components/CustomSnackbarService/custom-snackbar/custom-snackbar.service';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent  implements OnInit {

  forgotPasswordForm: FormGroup
  successMessage: string;
  errorMessage: string;
  showSuccess: boolean;
  showError: boolean;

  constructor(public customSnackbarService: CustomSnackbarService,public authService: AuthService,private location: Location,private router: Router,public authenticationservice: authenticationservice) { }
  ngOnInit(): void {
    this.forgotPasswordForm = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email])
    })
  }
  
  login() {
    this.authService.registerUser(false);
    this.authService.UsuarioAutenticado(false);
    this.location.back();
  }

  public validateControl = (controlName: string) => {
    return this.forgotPasswordForm.get(controlName).invalid && this.forgotPasswordForm.get(controlName).touched
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.forgotPasswordForm.get(controlName).hasError(errorName)
  }

  public forgotPassword = (forgotPasswordFormValue) => {
    this.showError = this.showSuccess = false;
    const forgotPass = { ...forgotPasswordFormValue };

    if (this.forgotPasswordForm.invalid) {
      this.errorMessage = 'Por favor, forneça um e-mail válido.';
      this.showError = true;
      return;
    }

    const forgotPassDto: ForgotPasswordDto = {
      email: forgotPass.email,
      clientURI: 'http://164.163.10.101:8080/authentication/resetpassword'
    }

    this.authenticationservice.forgotPassword('users/ForgotPassword', forgotPassDto)
    .subscribe({
      next: (res: ForgotResponseDto) => {
        console.log('Resposta da API:', res);
  
        // Usando um for-in para iterar sobre as propriedades do objeto
        for (const key in res) {
          if (res.hasOwnProperty(key)) {
            console.log(`Propriedade: ${key}, Valor: ${res[key]}`);
          }
        }
  
        console.log('Tipo de res.IsSuccess:', typeof res.isSuccess);
        console.log('Valor de res.IsSuccess:', res.isSuccess);
  
        if (res.isSuccess === true) {  // Garantir comparação com valor booleano
          console.log('Entrou no if: res.IsSuccess =', res.isSuccess);
          this.customSnackbarService.openSnackBar('Registro realizado com sucesso! Verifique seu email para confirmar o cadastro.', 'success');
          this.authService.registerUser(false);
          this.authService.UsuarioAutenticado(false);
          // Redireciona após 10 segundos
          setTimeout(() => {
            this.router.navigate(['login'], { replaceUrl: true });
          }, 10000); // 10 segundos
        } else {
          console.log('Entrou no else:', res.ErrorMessage);
          this.customSnackbarService.openSnackBar(res.ErrorMessage || 'Ocorreu um erro durante o registro.', 'error');
        }
      },
      error: (err: HttpErrorResponse) => {
        console.log('Error Response:', err);
        this.customSnackbarService.openSnackBar(err.error.errors?.join(' ') || 'Erro ao registrar usuário.', 'error');
      }
    });
  }
}