import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environment";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Observable, subscribeOn, tap, EMPTY, ObservedValueOf } from "rxjs";
import { Despesa } from "../models/Despesa";

@Injectable({
    providedIn: 'root'
})

export class DespesaService {

    constructor(private httpClient: HttpClient, private snackBar: MatSnackBar) {

    }

    private readonly baseURL = environment["endPoint"]

    AdicionarDespesa(despesa: Despesa) {
        return this.httpClient.post<Despesa>(`${this.baseURL}/AdicionarDespesa`,
        despesa)
    }

    ListaDespesaUsuario(emailUsuario: string) {
        return this.httpClient.get(`${this.baseURL}/ListaSistemaUsuario?emailUsuario=${emailUsuario}`
        )
    }
    CadastrarDespesaNoSistema(idSistema: number, emailUsuario: string) {
        return this.httpClient.post<any>(`${this.baseURL}/CadastrarUsuarioNoSistema?idSistema=${idSistema}&emailUsuario=${emailUsuario}`, null)
    }

    ListaDespesaUsuarioTable(emailUsuario: string): Observable<Despesa[]> {
        const url = `${this.baseURL}/ListarDespesasUsuario?emailUsuario=${emailUsuario}`;
      
        return this.httpClient.get<Despesa[]>(url)
          .pipe(
            tap(categorias => console.log(categorias))
          );
      }

      //Carregar graficos
      CarregaGraficos(emailUsuario: string): Observable<Despesa[]> {
        const url = `${this.baseURL}/CarregaGraficos?emailUsuario=${emailUsuario}`;
      
        return this.httpClient.get<Despesa[]>(url)
          .pipe(
            tap(carregagraficos => console.log(carregagraficos))
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