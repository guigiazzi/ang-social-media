import { Component, Input } from '@angular/core';
import { Professional } from '../interfaces/professional';

@Component({
  selector: 'app-cadastro-login',
  templateUrl: './cadastro-login.component.html',
  styleUrls: ['./cadastro-login.component.css']
})
export class CadastroLoginComponent {

  isSubmitted = false;
  public criarConta = false;
  public contaPremium = false;


  @Input() professional: Professional = <Professional>{};
  
  constructor() { }

  habilitaCadastro(){
    this.criarConta = !this.criarConta;
    if (this.criarConta===true){
      this.contaPremium = false
    }
  }
}
