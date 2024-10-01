import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { authenticationservice } from 'src/app/services/authentication.service';
import { PasswordConfirmationValidatorService } from 'src/app/shared/password-confirmation-validator.service';
import { ResetPasswordDto } from 'src/app/models/user/ResetPasswordDto';
import { HttpErrorResponse } from '@angular/common/http';
import { CustomSnackbarService } from 'src/app/components/CustomSnackbarService/custom-snackbar/custom-snackbar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;
  showSuccess: boolean = false;
  showError: boolean = false;
  errorMessage: string = '';
  routePath: string = '';
  queryParams: any = {};

  private token: string;
  private email: string;

  constructor(
    private authService: authenticationservice,
    private passConfValidator: PasswordConfirmationValidatorService,
    private route: ActivatedRoute,
    private customSnackbarService: CustomSnackbarService,
    private router: Router,
  ) {}

  ngOnInit(): void {

    this.initializeForm();
    this.captureRouteDetails();
  }

  private initializeForm(): void {
    this.resetPasswordForm = new FormGroup({
      password: new FormControl('', [Validators.required]),
      confirm: new FormControl('')
    });

    this.resetPasswordForm.get('confirm').setValidators([
      Validators.required,
      this.passConfValidator.validateConfirmPassword(this.resetPasswordForm.get('password'))
    ]);

    console.log('Formulário de redefinição de senha inicializado:', this.resetPasswordForm);
  }

  private captureRouteDetails(): void {
    // Captura o caminho completo da rota
    this.route.url.subscribe(urlSegments => {
      this.routePath = urlSegments.map(segment => segment.path).join('/');
      console.log('Rota atual:', this.routePath);

      this.routePath = this.route.snapshot.url.map(segment => segment.path).join('/');
      console.log('Rota atual snapshot:', this.routePath);
    });

    // Capture query parameters
    this.route.queryParams.subscribe(params => {
      this.queryParams = params;
      this.token = params['token'];
      this.email = params['email'];
      console.log('Query Params:', this.queryParams);
      console.log('Token recebido:', this.token);
      console.log('Email recebido:', this.email);

      if (!this.token || !this.email) {
        console.error('Token ou email ausente nos parâmetros da query.');
      }
    }, err => {
      console.error('Erro ao capturar parâmetros da query:', err);
    });
  }

  public validateControl(controlName: string): boolean {
    const control = this.resetPasswordForm.get(controlName);
    console.log(`Validando controle: ${controlName}`, control);
    return control.invalid && control.touched;
  }

  public hasError(controlName: string, errorName: string): boolean {
    const control = this.resetPasswordForm.get(controlName);
    console.log(`Verificando erro para controle: ${controlName}`, control);
    return control.hasError(errorName);
  }

  public resetPassword(resetPasswordFormValue: any): void {

    this.showError = this.showSuccess = false;
    const resetPass = { ...resetPasswordFormValue };

    const resetPassDto: ResetPasswordDto = {
      password: resetPass.password,
      confirmPassword: resetPass.confirm,
      token: this.token,
      email: this.email
    };


    this.authService.resetPassword('users/resetpassword', resetPassDto)
      .subscribe({
        next: () => {

          this.customSnackbarService.openSnackBar('Senha Criada, com sucesso!', 'success');
          setTimeout(() => {
            this.router.navigate(['login'], { replaceUrl: true });
          }, 2000);
        },
        error: (err: HttpErrorResponse) => {
          this.customSnackbarService.openSnackBar(err.error, 'error');
          this.showError = true;
          this.errorMessage = err.message;
        }
      });
  }
}
