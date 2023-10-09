import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'FinanceiroFront';
  isSideNavCollapsed = true;
  screenWidth = 0;
  isAuthenticated = false;

  constructor(private router: Router) {}

  ngOnInit() {

    this.checkAuthenticationStatus();
  }

  onToggleSideNav(data: SideNavToggle): void {
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }

  // Verifique a autenticação (substitua pela lógica real)
  private checkAuthenticationStatus(): void {
    // Simule a verificação de autenticação (substitua pela lógica real)
    const authToken = localStorage.getItem('authToken'); // Suponha que você armazene o token no localStorage
  
    // Verifique se um token de autenticação existe
    const isAuthenticated = !!authToken; // Verifica se o token existe
  
    // Atualize o estado de isAuthenticated com base na verificação
    this.isAuthenticated = isAuthenticated;
  }

  // Função para simular um login bem-sucedido
  onLoginSuccess() {
    this.isAuthenticated = true;
    this.router.navigate(['/dashboard']); // Redirecione para a página de dashboard após o login bem-sucedido
  }
}
