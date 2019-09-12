import { Component, Input } from '@angular/core';
import { Professional } from '../interfaces/professional';
import { AppService } from '../app.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
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
  
  constructor(private appService: AppService, private router: Router, private snackbar: MatSnackBar) { }

  onSubmit() {
    console.log(this.professional);
  }

  habilitaCadastro(){
    this.criarConta = !this.criarConta;
    if (this.criarConta===true){
      this.contaPremium = false
    }
  }
}
