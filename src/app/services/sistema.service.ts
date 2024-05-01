import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environment";
import { SistemaFinanceiro } from "../models/SistemaFinanceiro";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Observable, subscribeOn, tap, EMPTY, ObservedValueOf } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class SistemaService {

    constructor(private httpClient: HttpClient, private snackBar: MatSnackBar) {

    }

    private readonly baseURL = environment["endPoint"]

    AdicionarSistemaFinanceiro(sistemaFinanceiro: SistemaFinanceiro) {
        return this.httpClient.post<SistemaFinanceiro>(`${this.baseURL}/AdicionarSistemaFinanceiro`,
            sistemaFinanceiro)
    }

    AdicionarListaSistemaFinanceiro(sistemaFinanceiro: SistemaFinanceiro) {
        return this.httpClient.post<SistemaFinanceiro>(`${this.baseURL}/AdicionarSistemaFinanceiro`,
            sistemaFinanceiro)
    }

    ListaSistemaUsuario(emailUsuario: string) {
        return this.httpClient.get(`${this.baseURL}/ListaSistemaUsuario?emailUsuario=${emailUsuario}`
        )
    }
    CadastrarUsuarioNoSistema(idSistema: number, emailUsuario: string) {
        return this.httpClient.post<any>(`${this.baseURL}/CadastrarUsuarioNoSistema?idSistema=${idSistema}&emailUsuario=${emailUsuario}`, null)
    }

    ListaSistemaUsuarioTable(emailUsuario: string): Observable<SistemaFinanceiro[]> {
        const url = `${this.baseURL}/ListaSistemaUsuario?emailUsuario=${emailUsuario}`;
      
        return this.httpClient.get<SistemaFinanceiro[]>(url)
          .pipe(
            tap(sistemasfinanceiros => console.log(sistemasfinanceiros))
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