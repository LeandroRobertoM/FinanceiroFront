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
  isLoggedIn = false;
  isRegisteringUserin = false;
  isForgotPassword: boolean = false;



  constructor(private router: Router, public authService: AuthService) {}

  ngOnInit() {
    this.authService.isLoggedIn$.subscribe(loggedIn => {
      this.isLoggedIn = loggedIn;
    });
  
    // Subscrever apenas para receber atualizações de registro de usuário uma vez
    this.authService.isRegisteringUserIn$.subscribe(registering => {
      this.isRegisteringUserin = registering;
      if (registering) {
        console.log('isRegisteringUserin:', registering);
        // Aqui você pode fazer qualquer outra coisa que precise quando isRegisteringUserin for verdadeiro
      }
    });
  }

  onToggleSideNav(data: SideNavToggle): void {
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }

  checkAuthenticationStatus(): void {
    this.authService.UsuarioEstaAutenticado().then((isAuthenticated) => {
      this.isAuthenticated = isAuthenticated;
      console.log('Valor Variavel checkstatus:' + this.isAuthenticated);
    });
  }

  checkTokenOnRefresh(): void {

    console.log('Usuario Entrou antes do F5:');
    this.authService.getToken().subscribe((token) => {
      if (token) {
        this.isAuthenticated = true;
        console.log('Usuário autenticado. Token recebido:', token);
      } else {
        console.log('Usuário não autenticado. Redirecionando para a página de login.');
        this.isAuthenticated = false;
        this.router.navigate(['/login']);
      }
    });
  }

  onLoginSuccess() {
    this.authService.UsuarioEstaAutenticado()
    this.router.navigate(['/dashboard']);
  }

  Verificar() {

    this.router.navigate(['login/register']);
  }
}