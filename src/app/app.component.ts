import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

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

  constructor(private router: Router, public authService: AuthService) {}

  ngOnInit() {
    this.checkAuthenticationStatus();
    this.checkTokenOnRefresh();
  }

  onToggleSideNav(data: SideNavToggle): void {
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }

  checkAuthenticationStatus(): void {
    this.authService.UsuarioEstaAutenticado().then((isAuthenticated) => {
      this.isAuthenticated = isAuthenticated;
      console.log('Valor Variavel checkstatus:'+this.isAuthenticated);
    });
  }


  /// Problema está aqui comparar com o outro codigo. 
  checkTokenOnRefresh(): void {
    // Verifique o token quando a página é recarregada (F5)
    console.log('Usuario Entrou antes do F5:');

    /// aqui embaixo ele não consegui pegar o token;
    this.authService.getToken().subscribe((token) => {
      if (token) {
        // Usuário autenticado, faça o que for necessário com o token
        this.isAuthenticated = true;
        console.log('Usuário autenticado. Token recebido:', token);
        // Outras ações necessárias...
      } else {
        console.log('Usuário não autenticado. Redirecionando para a página de login.'); // Adicione esta linha para verificar se o usuário não está autenticado
        this.isAuthenticated = false;
        this.router.navigate(['/login']);
      }
    });
  }

  onLoginSuccess() {
    // Este método é chamado quando o login é bem-sucedido
    this.router.navigate(['/dashboard']);
  }
}
