import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomSnackbarComponent } from './custom-snackbar.component';

@Injectable({
  providedIn: 'root',
  
})
export class CustomSnackbarService {
  constructor(private snackBar: MatSnackBar) {}

  openSnackBar(message: string, type: 'success' | 'error'|'warning') {
    this.snackBar.openFromComponent(CustomSnackbarComponent, {
      data: { message, type },
      duration: 5000, 
      panelClass: [type === 'success' ? 'success-snackbar' : type === 'error' ? 'error-snackbar' : 'warning-snackbar'], // Seleciona a classe com base no tipo
      horizontalPosition: 'right',
      verticalPosition:'top',
    });
  }
}


