import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { authenticationservice } from 'src/app/services/authentication.service';

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
    this.confirmEmail();
  }
  
  constructor(public authenticationservice: authenticationservice, private _route: ActivatedRoute) { }

  private confirmEmail = () => {
    this.showError = this.showSuccess = false;

    const token = this._route.snapshot.queryParams['token'];
    const email = this._route.snapshot.queryParams['email'];
    
    this.authenticationservice.confirmEmail('/emailconfirmation', token, email)
    .subscribe({
      next: (_) => this.showSuccess = true,
      error: (err: HttpErrorResponse) => {
        this.showError = true;
        this.errorMessage = err.message;
      }
    })
  }
}