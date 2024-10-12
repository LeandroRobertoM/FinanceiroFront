import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-despesa-recorrente-dialog',
  templateUrl: './despesa-recorrente-dialog.component.html',
  styleUrls: ['./despesa-recorrente-dialog.component.scss']
})
export class DespesaRecorrenteDialogComponent implements OnInit {
  form: FormGroup;
  categorias: string[] = ['Empréstimo', 'Cartão']; // Lista de categorias
  metodosPagamento: string[] = ['Cartão de Crédito', 'Débito', 'Transferência'];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<DespesaRecorrenteDialogComponent>
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      quantidadeParcelas: [1, [Validators.required, Validators.min(1)]], // Corrigido para inicializar com 1
      frequencia: ['mensal', Validators.required],
      valorParcela: [0, [Validators.required, Validators.min(0)]],
      dataInicio: [new Date().toISOString().substring(0, 10), Validators.required],
      descricao: [''],
      categoria: [''], // Removido Validators.required
      metodoPagamento: [''], // Removido Validators.required
      status: ['ativa'],
      nota: ['']
    });
  }
  

  salvar(): void {
    console.log('Tentando salvar a despesa...');
    
    // Verifica se o formulário é válido
    if (this.form.valid) {
      console.log('Formulário válido:', this.form.value);
      const formData = this.form.value;
      this.dialogRef.close(formData);
      console.log('Diálogo fechado com sucesso');
    } else {
      console.log('Formulário inválido');

      // Itera sobre os controles do formulário para encontrar campos inválidos
      Object.keys(this.form.controls).forEach(field => {
        const control = this.form.get(field);
        if (control?.invalid) {
   
        }
      });
    }
  }

  cancelar(): void {
    this.dialogRef.close(); // Apenas fecha o diálogo sem salvar
  }
}