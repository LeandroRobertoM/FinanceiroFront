import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usuarioAutenticadoPortal: boolean = false;
  public isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();
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

  setEmailUser(email: string) {
    localStorage.setItem('emailUser', email);
  }

  getUserId(): string {
    // Aqui você pode implementar a lógica para obter o ID do usuário logado
    // Pode ser a partir de dados armazenados no localStorage, ou uma requisição HTTP para obter os detalhes do usuário do servidor
    // Por exemplo, se você armazenou o ID do usuário no localStorage quando ele fez login, você pode retorná-lo diretamente daqui
    return localStorage.getItem('userId');
  }

  

  getEmailUser() {
    var emailUserLogado = localStorage.getItem('emailUser');
    if (emailUserLogado) {
        return emailUserLogado;
    }
    else {
        this.limparDadosUsuario();
        return "";
    }
  }
}
