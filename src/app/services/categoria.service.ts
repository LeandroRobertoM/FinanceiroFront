import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ICategoria } from "../features/categoria/Categoria.model";
import { Observable, subscribeOn, tap, EMPTY, ObservedValueOf } from "rxjs";
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from "@angular/material/snack-bar";
import { map, catchError } from "rxjs/operators";


@Injectable()
export class categoriaService {

  private api: string = "http://localhost:5055/api"

  public dataSource = new MatTableDataSource<ICategoria>();
  constructor(private snackBar: MatSnackBar, private httpClient: HttpClient) { }

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, "X", {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ["msg-error"] : ["msg-success"],
    });
  }
  public salvarCliente(novoCategoria: ICategoria): Observable<ICategoria> {
    //  console.log(novoCliente);
    // this.httpClient.post(`${this.api}/api/Cliente`, novoCliente)
    //    .subscribe(() => { });
    return this.httpClient.post<ICategoria>(`${this.api}`, novoCategoria).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  //depois terei que ajustar para isso
  //getAllCategoria(email: string): Observable<ICategoria[]> {
  getAllCategoria(): Observable<ICategoria[]> {
    const email = 'leandro.machados@ndd.com.br'; // Defina o email desejado aqui
    const url = `${this.api}/ListarCategoriasUsuario?emailUsuario=${email}`;
    return this.httpClient.get<ICategoria[]>(url)
      .pipe(
        tap(categorias => console.log(categorias))
      );
  }
  getIDCliente(idCliente: number): Observable<ICategoria> {
    const url = `${this.api}/${idCliente}`;
    return this.httpClient.get<ICategoria>(url).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  updateCliente(cliente: ICategoria): Observable<ICategoria> {
    const url = `${this.api}`;
    console.log(url)
    return this.httpClient.put<ICategoria>(url, cliente).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }
  deleteCliente(cliente: ICategoria): Observable<ICategoria> {
    const url = `${this.api}/${cliente.idSistemaFinanceiro}`;
    console.log(url)
    return this.httpClient.delete<ICategoria>(url).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    ); 
  }
  
  errorHandler(e: any): Observable<any> {
    this.showMessage("Ocorreu um erro!", true);
    return EMPTY;
  }
}