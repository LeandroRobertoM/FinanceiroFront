import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environment";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Observable, subscribeOn, tap, EMPTY, ObservedValueOf } from "rxjs";
import { Categoria } from "../models/Categoria";
import { CustomEncoder } from "../shared/custom-encoder";
import { UserForRegistrationDto } from "../models/user/UserForRegistrationDto";
import { RegistrationResponseDto } from "../models/response/RegistrationResponseDto";
import { ResetPasswordDto } from "../models/user/ResetPasswordDto";
import { ForgotPasswordDto } from "../models/user/ForgotPasswordDto";
import { Subject } from 'rxjs';
import { UserForAuthenticationDto } from "../models/user/UserForAuthenticationDto";
import { AuthResponseDto } from "../models/response/AuthResponseDto";

@Injectable({
    providedIn: 'root'
})

export class authenticationservice {

    private authChangeSub = new Subject<boolean>()
    public authChanged = this.authChangeSub.asObservable();
    constructor(private httpClient: HttpClient, private snackBar: MatSnackBar) {

    }

    private readonly baseURL = environment["endPoint"]

    public registerUser = (route: string, body: UserForRegistrationDto) => {
        return this.httpClient.post<RegistrationResponseDto> (this.createCompleteRoute(route, this.baseURL), body);
    }

    public loginUser = (route: string, body: UserForAuthenticationDto) => {
        return this.httpClient.post<AuthResponseDto>(this.createCompleteRoute(route, this.baseURL), body);
      }
    
    public forgotPassword = (route: string, body: ForgotPasswordDto) => {
        return this.httpClient.post(this.createCompleteRoute(route, this.baseURL), body);
      }
    
      public resetPassword = (route: string, body: ResetPasswordDto) => {
        return this.httpClient.post(this.createCompleteRoute(route, this.baseURL), body);
      }
   
    public confirmEmail = (route: string, token: string, email: string) => {
        let params = new HttpParams({ encoder: new CustomEncoder() })
        params = params.append('token', token);
        params = params.append('email', email);
        
        return this.httpClient.get(this.createCompleteRoute(route, this.baseURL), { params: params });
    }

    public sendAuthStateChangeNotification = (isAuthenticated: boolean) => {
        this.authChangeSub.next(isAuthenticated);
    }
    
    public logout = () => {
        localStorage.removeItem("token");
        this.sendAuthStateChangeNotification(false);
      }



    private createCompleteRoute = (route: string, envAddress: string) => {
        return `${envAddress}/${route}`;
    }



}