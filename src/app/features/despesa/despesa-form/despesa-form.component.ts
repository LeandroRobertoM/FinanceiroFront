import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-despesa-form',
  templateUrl: './despesa-form.component.html',
  styleUrls: ['./despesa-form.component.scss']
})
export class DespesaFormComponent {
  constructor( public formBuilder: FormBuilder) {
    
}

despesaForm: FormGroup;

ngOnInit() {
    

  this.despesaForm = this.formBuilder.group
    (
      {
        name: ['', [Validators.required]]
      }
    )
}


dadorForm() {
  return this.despesaForm.controls;
}

enviar() {
  debugger
  var dados = this.dadorForm();

  alert(dados["name"].value)
}

}
