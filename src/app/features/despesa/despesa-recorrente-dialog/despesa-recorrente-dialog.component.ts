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
      quantidadeParcelas: [1, [Validators.required, Validators.min(1)]],
      frequencia: ['mensal', Validators.required],
      valorParcela: [0, [Validators.required, Validators.min(0)]],
      dataInicio: [new Date().toISOString().substring(0, 10), Validators.required],
      dataVencimento: [null, Validators.required],
      descricao: [''],
      categoria: ['', Validators.required],
      metodoPagamento: ['', Validators.required],
      status: ['ativa'],
      nota: ['']
    });
  }

  salvar(): void {
    if (this.form.valid) {
      const formData = this.form.value; // Pegue os dados do formulário
      this.dialogRef.close(formData); // Retorne os dados para o componente pai
    }
  }

  cancelar(): void {
    this.dialogRef.close(); // Apenas fecha o diálogo sem salvar
  }
}
