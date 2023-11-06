
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, UrlTree, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';


@Injectable(
  {
    providedIn:'root'
  }
)
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log('AuthGuard canActivate triggered'); // Adicione esta linha para depuração

    return new Promise((resolve) =>
      this.authService.checkToken().then((x) => {
        this.authService.UsuarioEstaAutenticado().then((status) => {
          let redirect: string = state.root.queryParams['redirect'];
          let blnUnAuthorize = false;

          //validation
          if (status === false) {
            console.log('Usuário não autenticado'); // Adicione esta linha para depuração
            blnUnAuthorize = true;
          }

          //redirect
          if (blnUnAuthorize && redirect != null && redirect.length > 0) {
            console.log('Redirecionando para a página de login com redirecionamento'); // Adicione esta linha para depuração
            this.router.navigate(['/login', { redirect }]);
          } else if (blnUnAuthorize) {
            console.log('Redirecionando para a página de login'); // Adicione esta linha para depuração
            this.router.navigate(['/login']);
          }

          resolve(status);
        }).catch(() => {
          console.log('Erro ao verificar autenticação'); // Adicione esta linha para depuração
          this.router.navigate(['/login']);
          resolve(false);
        });
      })
    );
  }
}