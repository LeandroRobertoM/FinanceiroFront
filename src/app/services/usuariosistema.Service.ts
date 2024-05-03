import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environment";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Observable, EMPTY } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { UsuarioSistemaModel } from "../models/UsuarioSistemaModel";


@Injectable({
    providedIn: 'root'
})

export class UsuarioSistemaService {

    constructor(private httpClient: HttpClient, private snackBar: MatSnackBar) {}

    private readonly baseURL = environment.endPoint;

    AdicionarListaSistemaFinanceiro(usuarioSistemaModel: UsuarioSistemaModel): Observable<any> {
        console.log('Enviando dados para a API:', usuarioSistemaModel); // Adicionando log para verificar os dados sendo enviados
    
        return this.httpClient.post<UsuarioSistemaModel>(`${this.baseURL}/CadastrarUsuarioListaSistemas`, usuarioSistemaModel)
            .pipe(
                tap(() => this.showMessage('Sistemas adicionados com sucesso!')),
                catchError(this.errorHandler)
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
