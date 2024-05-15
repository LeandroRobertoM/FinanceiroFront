import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usuarioAutenticadoPortal: boolean = false;
  private emailUser: string;
  public isLoggedInSubject = new BehaviorSubject<boolean>(false);
  public isRegisteringUserInSubject = new BehaviorSubject<boolean>(false);

  isLoggedIn$ = this.isLoggedInSubject.asObservable();
  isRegisteringUserIn$ = this.isRegisteringUserInSubject.asObservable();

  isRegisteringUser: boolean = false;
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
    this.isLoggedInSubject.next(true);
  }

  registerUser(status: boolean) {
    this.isRegisteringUserInSubject.next(true);
  }

  forgotPassword() {
    // Lógica de esqueceu a senha...
    this.isForgotPassword = true;
  }

  UsuarioEstaAutenticado(): Promise<boolean> {
    this.usuarioAutenticadoPortal = localStorage.getItem('usuarioAutenticadoPortal') == 'true';
    this.isLoggedInSubject.next(true);
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
    }
    else {
        this.limparDadosUsuario();
        return "";
    }
  }
}