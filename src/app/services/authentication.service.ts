import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environment";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Observable, subscribeOn, tap, EMPTY, ObservedValueOf } from "rxjs";
import { Categoria } from "../models/Categoria";
import { CustomEncoder } from "../shared/custom-encoder";
import { UserForRegistrationDto } from "../models/user/UserForRegistrationDto";
import { RegistrationResponseDto } from "../models/response/RegistrationResponseDto";

@Injectable({
    providedIn: 'root'
})

export class authenticationservice {

    constructor(private httpClient: HttpClient, private snackBar: MatSnackBar) {

    }

    private readonly baseURL = environment["endPoint"]

    public registerUser = (route: string, body: UserForRegistrationDto) => {
        return this.httpClient.post<RegistrationResponseDto> (this.createCompleteRoute(route, this.baseURL), body);
    }
    
   
    public confirmEmail = (route: string, token: string, email: string) => {
        let params = new HttpParams({ encoder: new CustomEncoder() })
        params = params.append('token', token);
        params = params.append('email', email);
        
        return this.httpClient.get(this.createCompleteRoute(route, this.baseURL), { params: params });
    }

    private createCompleteRoute = (route: string, envAddress: string) => {
        return `${envAddress}/${route}`;
      }

}