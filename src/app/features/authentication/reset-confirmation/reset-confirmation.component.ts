import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ForgotPasswordDto } from 'src/app/models/user/ForgotPasswordDto';
import { authenticationservice } from 'src/app/services/authentication.service';
import { Location } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';
import { ForgotResponseDto } from 'src/app/models/response/ForgotResponseDto';
import { CustomSnackbarService } from 'src/app/components/CustomSnackbarService/custom-snackbar/custom-snackbar.service';


@Component({
  selector: 'app-reset-confirmation',
  templateUrl: './reset-confirmation.component.html',
  styleUrls: ['./reset-confirmation.component.scss']
})
export class ResetConfirmationComponent implements OnInit {
  resetPasswordForm: FormGroup;
  showSuccess: boolean;
  showError: boolean;
  errorMessage: string;
  isPasswordReset: boolean = false;

  private token: string;
  private email: string;

  constructor(private router: Router,public authenticationservice: authenticationservice, private _route: ActivatedRoute) { }

  ngOnInit(): void {
    this.token = this._route.snapshot.queryParams['token'];
    this.email = this._route.snapshot.queryParams['email'];
    this.confirmEmail();
    const fullPath = this._route.url;
    console.log('Caminho completo da Rota:', fullPath);
    this.resetPasswordForm = new FormGroup({
      password: new FormControl('', [Validators.required]),
      confirm: new FormControl('', [Validators.required])
    });
  }

  public confirmEmail(): void {
    this.showError = this.showSuccess = false;
  
    this.authenticationservice.confirmEmail('Users/ResetEmailConfirmation', this.token, this.email)
    .subscribe({
      next: (response: any) => {
        this.showSuccess = true;
   
        this.token = response.passwordResetToken; 
        this.email = response.email;
  
        console.log('Token armazenado:', this.token);
  
      },
      error: (err: HttpErrorResponse) => {
        this.showError = true;
        this.errorMessage = err.message;
      }
    });
  }

  public showPasswordResetForm(): void {
    this.isPasswordReset = true;
  }

  public resetPassword(resetPasswordFormValue): void {
    const resetPassDto = {
      password: resetPasswordFormValue.password,
      confirmPassword: resetPasswordFormValue.confirm,
      token: this.token, // Agora este token é para reset de senha
      email: this.email,
      enumTipo: 1
    };
  
    console.log('Enviando para resetPassword:', resetPassDto);
  
    this.authenticationservice.resetPassword('users/resetpassword', resetPassDto).subscribe({
      next: () => {
        this.showSuccess = true;
        this.showError = false;
      },
      error: (err) => {
        this.showError = true;
        this.showSuccess = false;
        this.errorMessage = err.message;
      }
    });
  }

  goToLogin() {
    this.router.navigate(['/authentication/login']);
  }
}