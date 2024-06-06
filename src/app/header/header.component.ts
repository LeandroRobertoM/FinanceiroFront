import { Component, Input } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

userName: string = "Nome do Usuário";

@Input() collapsed=false;
@Input() screenwidth=0;

constructor(private authService: AuthService) {}

ngOnInit():void{
  this.userName = this.authService.getEmailUser();  
}

 logout() {
  // Implemente sua lógica de logout aqui, por exemplo, limpar o token de autenticação, redirecionar para a página de login, etc.
  console.log("Usuário desconectado");
  this.authService.limparDadosUsuario(); 
}

}
