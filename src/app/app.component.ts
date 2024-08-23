import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Location } from '@angular/common';
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
  isResetEmailConfirming = false;


  constructor(private router: Router, private location: Location, public authService: AuthService) {}

  ngOnInit() {
    this.authService.isLoggedIn$.subscribe(loggedIn => {
      this.isLoggedIn = loggedIn;
      console.log('isLoggedIn ok:', loggedIn);
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
        this.updateStateBasedOnUrl(event.url);
      }
    });

    this.location.subscribe(() => {
      this.updateStateBasedOnUrl(this.router.url);
    });
  }

  updateStateBasedOnUrl(url: string) {
    this.isEmailConfirming = url.includes('authentication/emailconfirmation');
    this.isResetEmailConfirming = url.includes('authentication/ResetConfirmation');
    this.isResetPassword = url.includes('authentication/resetpassword');
    this.isForgotPassword = url.includes('authentication/ForgotPassword');
    this.isRegisteringUserin = url.includes('login/registrar');

    console.log('URL matches emailconfirmation: ' + this.isEmailConfirming);
    console.log('URL matches isEmailResetConfirming: ' + this.isResetEmailConfirming);
    console.log('URL matches reset-password: ' + this.isResetPassword);
    console.log('URL matches forgot-password: ' + this.isForgotPassword);
    console.log('URL matches isLoggedIn: ' + this.isLoggedIn);
    console.log('URL matches isLoggedRegistert: ' + this.isRegisteringUserin);
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