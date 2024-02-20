import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environment";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Observable, subscribeOn, tap, EMPTY, ObservedValueOf } from "rxjs";
import { Categoria } from "../models/Categoria";

@Injectable({
    providedIn: 'root'
})

export class CategoriaService {

    constructor(private httpClient: HttpClient, private snackBar: MatSnackBar) {

    }

    private readonly baseURL = environment["endPoint"]

    AdicionarCategoria(categoria: Categoria) {
        return this.httpClient.post<Categoria>(`${this.baseURL}/AdicionarCategoria`,
        categoria)
    }

    ListaCategoriaUsuario(emailUsuario: string) {
        return this.httpClient.get(`${this.baseURL}/ListaSistemaUsuario?emailUsuario=${emailUsuario}`
        )
    }
    CadastrarCategoriaNoSistema(idSistema: number, emailUsuario: string) {
        return this.httpClient.post<any>(`${this.baseURL}/CadastrarUsuarioNoSistema?idSistema=${idSistema}&emailUsuario=${emailUsuario}`, null)
    }

    ListaCategoriaUsuarioTable(emailUsuario: string): Observable<Categoria[]> {
        const url = `${this.baseURL}/ListarCategoriasUsuario?emailUsuario=${emailUsuario}`;
      
        return this.httpClient.get<Categoria[]>(url)
          .pipe(
            tap(categorias => console.log(categorias))
          );
      }

      ListaCategoriaSistemas(emailUsuario: string): Observable<Categoria[]> {
        const url = `${this.baseURL}/ListarCategoriasUsuario?emailUsuario=${emailUsuario}`;
      
        return this.httpClient.get<Categoria[]>(url)
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