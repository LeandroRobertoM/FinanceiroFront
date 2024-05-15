import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { navbarData } from 'src/app/sidenav/nav-data';
import { HttpErrorResponse } from '@angular/common/http';
import { UserForRegistrationDto } from 'src/app/models/user/UserForRegistrationDto';
import { AuthService } from 'src/app/services/auth.service';
import { authenticationservice } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.scss']
})
export class LoginRegisterComponent {
  registerForm: FormGroup;
  navbarData = navbarData;
  errorMessage: string = '';
  showError: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loginService: LoginService,
    public authService: AuthService,
    public authenticationservice: authenticationservice,
  ) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      CPF: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('')
    });
  }


  public hasError = (controlName: string, errorName: string) => {
    return this.registerForm.get(controlName).hasError(errorName)
  }

  public registerUser = (registerFormValue) => {
    this.showError = false;
    const formValues = { ...registerFormValue };

    const user: UserForRegistrationDto = {
      email: formValues.email,
      password: formValues.password,
      confirmPassword: formValues.confirmPassword,
      CPF:formValues.CPF,
      clientURI: 'http://localhost:4200/authentication/emailconfirmation'
    };

    this.authenticationservice.registerUser("Users/Registration", user)
    .subscribe({
      next: (_) => this.router.navigate(["authentication/login"]),
      error: (err: HttpErrorResponse) => {
        this.errorMessage = err.message;
        this.showError = true;
      }
    })
  }
}
