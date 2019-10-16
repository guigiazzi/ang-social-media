import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { MatSnackBar } from '@angular/material';
import { SessionService } from '../shared/sessionService/session.service';
import { Router } from '@angular/router';
import { Professional } from '../interfaces/professional';

@Component({
  selector: 'app-atualizar-perfil',
  templateUrl: './atualizar-perfil.component.html',
  styleUrls: ['./atualizar-perfil.component.css']
})
export class AtualizarPerfilComponent implements OnInit{
  public showTopics = false;
  public idP = this.sessionService.getUserLogged();
  public professional: Professional;

  constructor(private appService: AppService, private snackbar: MatSnackBar, private router: Router, private sessionService: SessionService) { }

  ngOnInit(){
    console.log(this.idP)
    this.appService.retornarDadosUsuario(this.idP)
    .subscribe(res =>{
      this.professional = res;
    })
  }

  atualizarUsuario(usuario) {
    if(!usuario.jobRole.companyName && !usuario.jobRole.salary){
      delete usuario.jobRole;
    }else if(!usuario.jobRole.companyName){
      delete usuario.jobRole.companyName;
    }else if(!usuario.jobRole.salary){
      delete usuario.jobRole.salary;
    }

    if(usuario.name){
      usuario.name = usuario.name.charAt(0).toUpperCase() + usuario.name.substr(1);
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
