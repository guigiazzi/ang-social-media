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
  public amizade: number;
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
      // console.log('FRIENDS'+this.friends);
      this.showSpinner = false;
      this.suggestedProfessionals(this.usuario.professionalID);
      },
        err => {
          console.log(err);
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
        console.log(res);
        this.commonFriends = res;
      },
      err => {
        console.log(err);
      }
    )
  }

  goToUserProfile(id: String) {
    // console.log(id);
    this.router.navigate([`friends`, id]);
  }

//   getFriendsInCommon(friends: Professional[]) {
//     let tempCommonFriends: Professional[];
//     friends.forEach(friend => {
//       this.appservice.getFriendsInCommon(this.usuario.professionalID, friend.professionalID)
//         .subscribe(
//           res => {
//             tempCommonFriends = res;
// // Adicionando lista temp à lista ofical
//             tempCommonFriends.forEach(commonFriend => {
//               this.commonFriends.push(commonFriend);
//               console.log(this.commonFriends);
//             });

//           },
//           err => {
//             console.log(err);
//             this.snackbar.open('Ocorreu um erro ao carregar a lista de Amigos!', 'Dismiss', {
//               duration: 4000,
//               panelClass: ['error-snackbar']
//             });
//             this.showSpinner = false;
//           }
//         );
//     });
//   }

  adicionarAmizade() {
    this.appservice.sendFriendshipRequest(this.userLoggedId, this.usuario.professionalID)
    .subscribe(res => {
      this.statusAmizade();
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

  aceitarAmizade() {
    this.appservice.acceptFriendShipRequest(this.userLoggedId, this.usuario.professionalID)
    .subscribe(res => {
      this.statusAmizade()
      this.snackbar.open('Solicitação de amizade aceita!', 'Dismiss', {
        duration: 4000,
        panelClass: ['success-snackbar']
      })
    },err => {
      console.log(err)
      this.snackbar.open('Erro ao aceitar solicitação de amizade!', 'Dismiss', {
        duration: 4000,
        panelClass: ['error-snackbar']
      });
    });
  }

  rejeitarPedidoAmizade() {
    this.appservice.rejectFriendshipRequest(this.userLoggedId, this.usuario.professionalID)
    .subscribe(res => {
      this.statusAmizade()
      this.snackbar.open(`Amizade Recusada com sucesso!`, 'Dismiss', {
        duration: 4000,
        panelClass: ['success-snackbar']
      })
    },err => {
      console.log(err)
      this.snackbar.open(`Erro ao recusar solicitação de amizade!`, 'Dismiss', {
        duration: 4000,
        panelClass: ['error-snackbar']
      })
    })
  }

  desfazerAmizade() {
    this.appservice.unfriend(this.userLoggedId, this.usuario.professionalID)
    .subscribe(res => {
      this.statusAmizade()
      this.snackbar.open('Amizade desfeita com sucesso!', 'Dismiss', {
        duration: 4000,
        panelClass: ['success-snackbar']
      })
    },err => {
      console.log(err)
      this.snackbar.open('Erro ao desfazer amizade!', 'Dismiss', {
        duration: 4000,
        panelClass: ['error-snackbar']
      })
    })
  }

  cancelarSolicitacaoAmizade() {
    this.appservice.cancelarSolicitacao(this.userLoggedId, this.usuario.professionalID)
    .subscribe(res => {
      this.statusAmizade()
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




  statusAmizade() {
    this.appservice.getFriendshipStatus(this.userLoggedId, this.usuario.professionalID)
    .subscribe(res =>{
      console.log(res)
      this.amizade = res;
      // 1 - Amigos
      // 2 - Solicitacao enviada
      // 3 - Solicitacao pendente de aceitacao
      // 4 - Nao amigos
    })
  }

}