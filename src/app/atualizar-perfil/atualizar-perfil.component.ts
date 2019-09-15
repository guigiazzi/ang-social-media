import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { MatSnackBar } from '@angular/material';
import { SessionService } from '../shared/sessionService/session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-atualizar-perfil',
  templateUrl: './atualizar-perfil.component.html',
  styleUrls: ['./atualizar-perfil.component.css']
})
export class AtualizarPerfilComponent{
  public showTopics = false;
  public idP = this.sessionService.getUserLogged();

  constructor(private appService: AppService, private snackbar: MatSnackBar, private router: Router, private sessionService: SessionService) { }

  atualizarUsuario(usuario) {
    if(!usuario.jobRole.companyName && !usuario.jobRole.salary){
      delete usuario.jobRole;
    }else if(!usuario.jobRole.companyName){
      delete usuario.jobRole.companyName;
    }else if(!usuario.jobRole.salary){
      delete usuario.jobRole.salary;
    }

    usuario.professionalID = this.sessionService.getUserLogged();
    this.appService.updateProfessional(usuario)
    .subscribe(res=>{
      this.snackbar.open('Usuário cadastrado com sucesso!', 'Dismiss', {
        duration: 4000,
        panelClass: ['success-snackbar']
      })
      this.showTopics = true;
    },error => {
      console.log(error);
      this.snackbar.open('Usuario ou senha incorreto!', 'Dismiss' , {
        duration: 2000,
        panelClass: ['error-snackbar'] 
      })
    });
  }

  changeTopics() {
    this.showTopics = true;
  }

  goToHome(){
    let user = this.sessionService.getUserLogged();
    this.router.navigate([`postagens`, user]);
  }

}
