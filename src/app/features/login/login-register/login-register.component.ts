import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { UserForRegistrationDto } from 'src/app/models/user/UserForRegistrationDto';
import { AuthService } from 'src/app/services/auth.service';
import { authenticationservice } from 'src/app/services/authentication.service';
import { RegistrationResponseDto } from 'src/app/models/response/RegistrationResponseDto';
import { debounceTime } from 'rxjs/operators';
import { Location } from '@angular/common';
import { CustomSnackbarService } from 'src/app/components/CustomSnackbarService/custom-snackbar/custom-snackbar.service';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.scss']
})
export class LoginRegisterComponent implements OnInit {
  registerForm: FormGroup;
  errorMessage: string = '';
  showError: boolean = false;
  showSuccess: boolean = false;
  passwordMismatch: boolean = false;
  private doneTypingInterval = 500; // Tempo para aguardar após a última digitação

  constructor(
    private location: Location,
    
    private formBuilder: FormBuilder,
    private router: Router,
    public authService: AuthService,
    public authenticationservice: authenticationservice,
    public customSnackbarService: CustomSnackbarService,
  ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      aboutUser: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      CPF: ['', [Validators.required, this.cpfCnpjValidator.bind(this)]],
      confirmPassword: ['', Validators.required]
    });

    // Adiciona o listener para o campo CPF com debounce
    this.registerForm.get('CPF').valueChanges.pipe(
      debounceTime(this.doneTypingInterval) // Espera 500ms após a última digitação
    ).subscribe(value => {
      this.applyMask(value);
    });
  }

  login() {
    this.authService.registerUser(false);
    this.authService.UsuarioAutenticado(false);
    this.location.back();
  }

  esqueceuSenha() {
    console.log('Método esqueceuSenha() foi chamado agora.');
    this.authService.forgotPassword(true);
    this.authService.registerUser(false);
    this.router.navigate(['authentication/ForgotPassword']);
  }

  hasError(controlName: string, errorName: string): boolean {
    const control = this.registerForm.get(controlName);
    return control?.hasError(errorName) && (control.touched || control.dirty);
  }

  cleanCpfCnpj(value: string): string {
    return value.replace(/\D/g, '');
  }

  cpfCnpjValidator(control: FormControl) {
    const value = control.value;
    if (!value) {
      return null;
    }

    const cleanedValue = this.cleanCpfCnpj(value);
    const isValidCpf = cleanedValue.length === 11 && /^\d{11}$/.test(cleanedValue);
    const isValidCnpj = cleanedValue.length === 14 && /^\d{14}$/.test(cleanedValue);

    if (isValidCpf || isValidCnpj) {
      return null;
    } else {
      return { invalidCpfCnpj: true };
    }
  }

  applyMask(value: string) {
    const cleanedValue = this.cleanCpfCnpj(value);
    let maskedValue = '';

    if (cleanedValue.length <= 11) {
      // Aplica máscara para CPF
      maskedValue = cleanedValue.replace(/(\d{3})(\d{3})?(\d{3})?(\d{2})?/, (match, p1, p2, p3, p4) => {
        return p1 + (p2 ? '.' + p2 : '') + (p3 ? '.' + p3 : '') + (p4 ? '-' + p4 : '');
      });
    } else if (cleanedValue.length >= 14) {
      // Aplica máscara para CNPJ
      maskedValue = cleanedValue.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, (match, p1, p2, p3, p4, p5) => {
        return p1 + '.' + p2 + '.' + p3 + '/' + p4 + '-' + p5;
      });
    }

    // Atualiza o valor do campo
    this.registerForm.get('CPF').setValue(maskedValue, { emitEvent: false });
  }

  registerUser() {
    this.showError = false;
    this.showSuccess = false;
    if (this.registerForm.invalid) {
      this.errorMessage = 'Por favor, preencha todos os campos obrigatórios.';
      this.showError = true;
      return;
    }

    const formValues = this.registerForm.value;
    if (formValues.password !== formValues.confirmPassword) {
      this.errorMessage = 'As senhas não são iguais.';
      this.showError = true;
      return;
    }

    const user: UserForRegistrationDto = {
      email: formValues.email,
      password: formValues.password,
      confirmPassword: formValues.confirmPassword,
      CPF: this.cleanCpfCnpj(formValues.CPF),
      clientURI: 'http://localhost:4200/authentication/emailconfirmation'
    };

    this.authenticationservice.registerUser('Users/Registration', user).subscribe({
      next: (res: RegistrationResponseDto) => {
        if (res.status === 200) {
          this.customSnackbarService.openSnackBar('Registro realizado com sucesso!\n Verifique seu email para confirmar o cadastro.', 'success');
          this.authService.registerUser(false);
          this.authService.UsuarioAutenticado(false);

          // Redireciona após 10 segundos
          setTimeout(() => {
            this.router.navigate(['login'], { replaceUrl: true });
          }, 10000); // 10 segundos
        } else {
          // Exibe mensagem de erro no Snackbar
          this.customSnackbarService.openSnackBar(res.mensagem || 'Ocorreu um erro durante o registro.', 'error');

        }
      },
      error: (err: HttpErrorResponse) => {
        // Exibe mensagem de erro no Snackbar
        this.customSnackbarService.openSnackBar(err.error.errors?.join(' ') || 'Erro ao registrar usuário.', 'error');
      }
    });
  }
}


