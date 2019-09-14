import { Component, Input } from '@angular/core';
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
  public criarConta = false;
  public contaPremium = false;
  public showSpinner = false;

  @Input() professional: Professional = <Professional>{};

  constructor(private appService: AppService, private router: Router, private snackbar: MatSnackBar,  private sessionService: SessionService) { }

  onSubmit() {
    console.log('login ' + this.professional.userLogin + ' e ' + this.professional.password);
    this.showSpinner = true;
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
    console.log(usuario, 'emitiuuuuu')
    this.appService.cadastrarProfessional(usuario)
      .subscribe(
        () => {
          this.snackbar.open('Usuário cadastrado com sucesso!', 'Dismiss', {
            duration: 4000,
            panelClass: ['success-snackbar']
          });
          this.showSpinner = false;
        },
        () => {
          this.snackbar.open('Não foi possivel cadastrar o usuario!', 'Dismiss', {
            duration: 4000,
            panelClass: ['error-snackbar']
          });
          this.showSpinner = false;
        });
  }

  habilitaCadastro() {
    this.criarConta = !this.criarConta;
    if (this.criarConta === true) {
      this.contaPremium = false
    }
  }
}
