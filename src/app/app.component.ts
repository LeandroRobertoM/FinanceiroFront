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
    
  }

  onToggleSideNav(data: SideNavToggle): void {
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }

  // Verifique a autenticação (substitua pela lógica real)
  checkAuthenticationStatus(): void {
    this.authService.UsuarioEstaAutenticado().then((isAuthenticated) => {
      this.isAuthenticated = isAuthenticated;
    });
  }


  onLoginSuccess() {
    this.isAuthenticated = true;
    this.router.navigate(['/dashboard']); // Redirecione para a página de dashboard após o login bem-sucedido
  }
}
