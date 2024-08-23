import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usuarioAutenticadoPortal: boolean = false;
  private emailUser: string;
  public isLoggedInSubject = new BehaviorSubject<boolean>(false);
  public isRegisteringUserInSubject = new BehaviorSubject<boolean>(false);
  public isEmailConfirmingSubject = new BehaviorSubject<boolean>(false);
  public isResetEmailConfirmingSubject = new BehaviorSubject<boolean>(false);
  public isForgotPasswordInSubject = new BehaviorSubject<boolean>(false);

  isLoggedIn$ = this.isLoggedInSubject.asObservable();
  isRegisteringUserIn$ = this.isRegisteringUserInSubject.asObservable();
  isEmailConfirmingIn$ = this.isEmailConfirmingSubject.asObservable();
  isEmailResetConfirmingIn$ = this.isResetEmailConfirmingSubject.asObservable();
  isForgotPasswordIn$ = this.isForgotPasswordInSubject.asObservable();

  isRegisteringUser: boolean = false;
  isResetEmailConfirming: boolean = false;
  isEmailConfirming: boolean = false;
  isForgotPassword: boolean = false;
  
  private token: any;
  private user: any;

  constructor(private httpClient: HttpClient) {}

  checkToken() {
    return Promise.resolve(true);
  }

  UsuarioAutenticado(status: boolean) {
    localStorage.setItem('usuarioAutenticadoPortal', JSON.stringify(status));
    this.usuarioAutenticadoPortal = status;
    this.isLoggedInSubject.next(status);
  }

  registerUser(status: boolean) {
    this.isRegisteringUserInSubject.next(status);
  }

  confirmEmail(token: string, email: string): Observable<boolean> {
    console.log(`Confirmação de email com token: ${token} e email: ${email}`);
    this.isEmailConfirmingSubject.next(false);
    return of(true);
  }

  ResetconfirmEmail(token: string, email: string): Observable<boolean> {
    console.log(`Confirmação de email com token: ${token} e email: ${email}`);
    this.isResetEmailConfirmingSubject.next(false);
    return of(true);
  }

  forgotPassword(status: boolean) {
    this.isForgotPasswordInSubject.next(status);
    console.log(`RESET de email com token: e email:`);
  }

  UsuarioEstaAutenticado(): Promise<boolean> {
    this.usuarioAutenticadoPortal = localStorage.getItem('usuarioAutenticadoPortal') === 'true';
    this.isLoggedInSubject.next(this.usuarioAutenticadoPortal);
    return Promise.resolve(this.usuarioAutenticadoPortal);
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
    this.token = token;
  }

  get getToken() {
    this.token = localStorage.getItem('token');
    console.log('GETTOKEN:', this.token);
    return this.token;
  }

  limparToken() {
    this.token = null;
    this.user = null;
  }

  limparDadosUsuario() {
    this.UsuarioAutenticado(false);
    this.limparToken();
    localStorage.clear();
    sessionStorage.clear();
  }

  setRegisteringUser(value: boolean) {
    this.isRegisteringUser = value;
  }

  setEmailUser(email: string) {
    localStorage.setItem('emailUser', email);
  }

  getUserId(): string {
    return localStorage.getItem('userId');
  }

  getUserEmaillogin(): string {
    return this.emailUser;
  }

  getEmailUser() {
    var emailUserLogado = localStorage.getItem('emailUser');
    this.emailUser = localStorage.getItem('emailUser');
    if (emailUserLogado) {
        return emailUserLogado;
    } else {
        this.limparDadosUsuario();
        return "";
    }
  }
}