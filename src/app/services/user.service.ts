import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environment";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Observable, subscribeOn, tap, EMPTY, ObservedValueOf } from "rxjs";
import { UsuarioModel } from "../models/UsuarioModel";

@Injectable({
    providedIn: 'root'
})

export class UserService {

      constructor(private httpClient: HttpClient, private snackBar: MatSnackBar) {

    }

      private readonly baseURL = environment["endPoint"];


      adicionarUsuario(usuariomodel: UsuarioModel) {
        return this.httpClient.post<UsuarioModel>(`${this.baseURL}/AdicionaUsuario`,
        usuariomodel)
    }


      atualizarUsuario(id: string, email: string, senha: string, cpf: string) {
        return this.httpClient.put<any>(`${this.baseURL}/AtualizaUsuario/${id}`, { email, senha, cpf });
      }
    
      deletarUsuario(id: string) {
        return this.httpClient.delete<any>(`${this.baseURL}/DeletaUsuario/${id}`);
      }
    
      listarUsuarios() {
        return this.httpClient.get<Array<UsuarioModel>>(`${this.baseURL}/ListaUsuarios`);
      }

      ListaUsuarioSistema(emailUsuario: string): Observable<UsuarioModel[]> {
        const url = `${this.baseURL}/ListarDespesasUsuario?emailUsuario=${emailUsuario}`;
      
        return this.httpClient.get<UsuarioModel[]>(url)
          .pipe(
            tap(categorias => console.log(categorias))
          );
      }

      showMessage(msg: string, isError: boolean = false): void {
        this.snackBar.open(msg, "X", {
            duration: 2500,
            horizontalPosition: "right",
            verticalPosition: "top",
            panelClass: isError ? ["msg-error"] : ["msg-success"],
        });
    }

    errorHandler(e: any): Observable<any> {
        this.showMessage("Ocorreu um erro!", true);
        return EMPTY;
      }

}