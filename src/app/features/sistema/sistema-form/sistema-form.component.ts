import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sistema-form',
  templateUrl: './sistema-form.component.html',
  styleUrls: ['./sistema-form.component.scss']
})
export class SistemaFormComponent {
  constructor( public formBuilder: FormBuilder) {
  }


  sistemaForm: FormGroup;

  ngOnInit() {
    

    this.sistemaForm = this.formBuilder.group
      (
        {
          name: ['', [Validators.required]]
        }
      )
  }


  dadorForm() {
    return this.sistemaForm.controls;
  }

  enviar() {
    debugger
    var dados = this.dadorForm();

    alert(dados["name"].value)
  }

}