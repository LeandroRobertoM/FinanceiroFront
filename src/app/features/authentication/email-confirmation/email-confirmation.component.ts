import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { authenticationservice } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-email-confirmation',
  templateUrl: './email-confirmation.component.html',
  styleUrls: ['./email-confirmation.component.scss']
})
export class EmailConfirmationComponent implements OnInit {
  showSuccess: boolean;
  showError: boolean;
  errorMessage: string;

  ngOnInit(): void {
    console.log('Rota atual:', this.router.url);
    console.log('Query Params:', this._route.snapshot.queryParams);
    this.confirmEmail();
  }
  
  constructor(private router: Router,public authenticationservice: authenticationservice, private _route: ActivatedRoute) { }

  private confirmEmail = () => {
    this.showError = this.showSuccess = false;

    const token = this._route.snapshot.queryParams['token'];
    const email = this._route.snapshot.queryParams['email'];
    
    this.authenticationservice.confirmEmail('Users/EmailConfirmation', token, email)
    .subscribe({
      next: (_) => this.showSuccess = true,
      error: (err: HttpErrorResponse) => {
        this.showError = true;
        this.errorMessage = err.message;
      }
    })
  }

  goToLogin() {

    this.router.navigate(['/authentication/login']);
  }
}