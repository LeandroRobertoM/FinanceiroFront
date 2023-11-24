import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SistemaFinanceiro } from 'src/app/models/SistemaFinanceiro';
import { SistemaService } from 'src/app/services/sistema.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sistema-form',
  templateUrl: './sistema-form.component.html',
  styleUrls: ['./sistema-form.component.scss']
})
export class SistemaFormComponent {
  constructor( public formBuilder: FormBuilder, public sistemaService: SistemaService,
    public authService : AuthService) {
  
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
    
    console.error('Entrou linha 42 de erro:');
    let item = new SistemaFinanceiro();
    item.Nome= dados["name"].value;

    item.id=0;
    item.Mes=0;
    item.Ano=0;
    item.DiaFechamento=0;
    item.GerarCopiaDespesa=true;
    item.MesCopia=0;
    item.AnoCopia=0; 
    

    this.sistemaService.AdicionarSistemaFinanceiro(item)
    .subscribe((response: any) => {
      const sistemaFinanceiro: SistemaFinanceiro = response.dados;
      console.error('SistemaFianceiro:'+ sistemaFinanceiro.id);
      //this.sistemaService.CadastrarUsuarioNoSistema(response.Id,this.authService.getEmailUser())
      this.sistemaForm.reset();
      this.sistemaService.CadastrarUsuarioNoSistema(sistemaFinanceiro.id,"leandro.machados@ndd.com.br")
      .subscribe((response: any) => {
        debugger
      }, (error) => console.error(error),
        () => { })

    }, (error) => console.error(error),
      () => { })

    alert(dados["name"].value)
  }

}