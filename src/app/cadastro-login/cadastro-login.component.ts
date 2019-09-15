import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Professional } from '../interfaces/professional';
import { AppService } from '../app.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { SessionService } from '../shared/sessionService/session.service';

@Component({
  selector: 'app-cadastro-login',
  templateUrl: './cadastro-login.component.html',
  styleUrls: ['./cadastro-login.component.css']
})
export class CadastroLoginComponent {

  isSubmitted = false;
  public criarConta = false; // false
  public contaPremium = false;
  public showTopics = false; // false
  public idP: string;

  @Input() professional: Professional = <Professional>{};
  @Output() outProfessionalId: EventEmitter<string> = new EventEmitter();

  constructor(private appService: AppService, private router: Router, private snackbar: MatSnackBar,  private sessionService: SessionService) { }

  onSubmit() {
    console.log('login ' + this.professional.userLogin + ' e ' + this.professional.password);
    this.appService.login(this.professional)
      .subscribe(
        res => {
          this.sessionService.saveUserLoggedId(res.professionalID)
          console.log(res.professionalID);
          this.router.navigate(['postagens', res.professionalID])
        },error => { 
          console.log(error);
          this.snackbar.open('Usuario ou senha incorreto!', 'Dismiss' , {
          duration: 2000,
          panelClass: ['error-snackbar'] }
        );
    });
  }

  cadastrarUsuario(usuario) {
    usuario.name = usuario.name.charAt(0).toUpperCase() + usuario.name.substr(1);
    this.appService.cadastrarProfessional(usuario)
      .subscribe(
        res => {
          this.snackbar.open('Usuário cadastrado com sucesso!', 'Dismiss', {
            duration: 4000,
            panelClass: ['success-snackbar']
          });
          this.showTopics = true;
          this.idP = res.professionalID;
        },
        () => {
          this.snackbar.open('Não foi possivel cadastrar o usuario!', 'Dismiss', {
            duration: 4000,
            panelClass: ['error-snackbar']
          });
        });
  }

  habilitaCadastro() {
    this.criarConta = !this.criarConta;
    if (this.criarConta === true) {
      this.contaPremium = false
    }
  }
}
