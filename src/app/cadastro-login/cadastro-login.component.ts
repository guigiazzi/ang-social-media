import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-cadastro-login',
  templateUrl: './cadastro-login.component.html',
  styleUrls: ['./cadastro-login.component.css']
})
export class CadastroLoginComponent implements OnInit {

  isSubmitted = false;
  public criarConta = false;
  public contaPremium = false;
  
  State: any = ['AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','TO']

  constructor(public fb: FormBuilder) { }

  ngOnInit() {
  }

  loginForm = this.fb.group({
    login: ['',[Validators.required]],
    password: ['',[Validators.required]]
  })

  registrationForm = this.fb.group({
    stateName: ['', [Validators.required]]
  })

  changeState(e) {
    console.log(e.value)
    this.stateName.setValue(e.target.value, {
      onlySelf: true
    })
  }

  get stateName() {
    return this.registrationForm.get('stateName');
  }

  onSubmit() {
    this.isSubmitted = true;
    if (!this.registrationForm.valid) {
      return false;
    } else {
      alert(JSON.stringify(this.registrationForm.value))
    }

  }

  habilitaCadastro(){
    this.criarConta = !this.criarConta;
  }

  habilitaPagamento(){
    this.contaPremium = !this.contaPremium;
  }

  verificaBandeira(event){
    alert("opa");
  }
}
