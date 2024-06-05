import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
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

  isResetPassword = false;
  isForgotPassword = false;
  isEmailConfirming = false;

  constructor(private router: Router, public authService: AuthService) {}

  ngOnInit() {
    this.authService.isLoggedIn$.subscribe(loggedIn => {
      this.isLoggedIn = loggedIn;
      console.log('isLoggedIn:', loggedIn);
    });

    this.authService.isRegisteringUserIn$.subscribe(registering => {
      this.isRegisteringUserin = registering;
      console.log('isRegisteringUserin:', registering);
    });

    this.authService.isForgotPasswordIn$.subscribe(forgotPassword => {
      this.isForgotPassword = forgotPassword;
      console.log('isForgotPassword:', forgotPassword);
    });

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        console.log('NavigationEnd Event URL:', event.url);
        
        if (event.url.includes('authentication/emailconfirmation')) {
          this.isEmailConfirming = true;
        } else {
          this.isEmailConfirming = false;
        }

        if (event.url.includes('authentication/resetpassword')) {
          this.isResetPassword = true;
        } else {
          this.isResetPassword = false;
        }

        console.log('URL matches emailconfirmation: ' + this.isEmailConfirming);
        console.log('URL matches reset-password: ' + this.isResetPassword);
      }
    });
  }

  onToggleSideNav(data: SideNavToggle): void {
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }

  checkAuthenticationStatus(): void {
    this.authService.UsuarioEstaAutenticado().then(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;
      console.log('Valor Variavel checkstatus:', this.isAuthenticated);
    });
  }

  checkTokenOnRefresh(): void {
    this.authService.getToken().subscribe(token => {
      if (token) {
        this.isAuthenticated = true;
        console.log('Usuário autenticado. Token recebido:', token);
      } else {
        this.isAuthenticated = false;
        this.router.navigate(['/login']);
      }
    });
  }

  onLoginSuccess() {
    this.authService.UsuarioEstaAutenticado();
    this.router.navigate(['/dashboard']);
  }

  Verificar() {
    this.router.navigate(['login/register']);
  }
}