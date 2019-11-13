import { Component, OnInit } from '@angular/core';
import { Professional } from '../interfaces/professional';
import { AppService } from '../app.service';
import { SessionService } from '../shared/sessionService/session.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {
  public friends: Professional[] = [];
  public userLoggedId: string;
  public usuario: Professional = {} as Professional;
  public showSpinner = false;
  public userDefault = '../../assets/images/user-icon.jpg';
  public commonFriends: Professional[] = [];
  public isMyProfile = false;



  constructor(
    private router: Router,
    private appservice: AppService,
    private snackbar: MatSnackBar,
    private sessionService: SessionService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.showSpinner = true;
    this.userLoggedId = this.sessionService.getUserLogged();
    if (this.userLoggedId === this.usuario.professionalID) {
      this.isMyProfile = true;
    }
    this.usuario.professionalID = this.route.snapshot.paramMap.get('id');
    this.appservice.getListFriends(this.usuario.professionalID)
    .subscribe(res => {
      this.friends = res;
      this.showSpinner = false;
      this.suggestedProfessionals(this.usuario.professionalID);
      },
        err => {
          // console.log(err);
          this.snackbar.open('Ocorreu um erro ao carregar a lista de Amigos!', 'Dismiss', {
            duration: 4000,
            panelClass: ['error-snackbar']
          });
          this.showSpinner = false;
        })
  }
  suggestedProfessionals(professionalID: string){
    this.appservice.suggestedProfessionals(professionalID)
    .subscribe(
      res => {
        res.forEach(response => {
          // console.log(response);
          this.statusAmizade(response);
          // console.log('aqui')
        });
        // console.log(res);
        this.commonFriends = res;
      },
      err => {
        // console.log(err);
      }
    )
  }

  goToUserProfile(id: String) {
    this.router.navigate([`postagens`, id]);
  }

   adicionarAmizade(professional: Professional) {
     this.appservice.sendFriendshipRequest(this.userLoggedId, professional.professionalID)
     .subscribe(res => {
       this.statusAmizade(professional);
       this.snackbar.open(`Solicitação enviada!`, 'Dismiss', {
         duration: 4000,
         panelClass: ['success-snackbar']
       });
     }, err => {
       console.log(err);
       this.snackbar.open(`Erro enviar solicitação de amizade!`, 'Dismiss', {
         duration: 4000,
         panelClass: ['error-snackbar']
       });
     });
   }

   cancelarSolicitacaoAmizade(professional:Professional) {
     this.appservice.cancelarSolicitacao(this.userLoggedId, professional.professionalID)
     .subscribe(res => {
       this.statusAmizade(professional);
       this.snackbar.open('Solicitação de amizade cancelada com sucesso!', 'Dismiss', {
         duration: 4000,
         panelClass: ['success-snackbar']
       })
     }, err => {
       console.log(err)
       this.snackbar.open('Erro ao cancelar pedido de amizade!', 'Dismiss', {
         duration: 4000,
         panelClass: ['error-snackbar']
       })
     })
   }




  statusAmizade(usuario2: Professional) {
    // console.log(usuario2)
    this.appservice.getFriendshipStatus(this.userLoggedId, usuario2.professionalID)
    .subscribe(res =>{
      // console.log(res)
      usuario2.statusAmizade = res;
      // 1 - Amigos
      // 2 - Solicitacao enviada
      // 3 - Solicitacao pendente de aceitacao
      // 4 - Nao amigos
    })
  }

}