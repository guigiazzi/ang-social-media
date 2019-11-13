import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Publication } from 'src/app/interfaces/publication';
import { AppService } from './../../app.service';
import { MatSnackBar } from '@angular/material';
import { Professional } from 'src/app/interfaces/professional';
import { OpenModalPeopleService } from './../modal-people/open-modal-people-service.service';
import { SessionService } from '../sessionService/session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.css']
})

export class PublicationComponent implements OnInit {
  @Input() publication;
  @Output() clickedDeletPublication = new EventEmitter();
  @Input() isMyProfile;
  @Input() professionalLike;
  public alreadyLikePost: boolean = false;
  public likeLength: number;
  public likeList = [];
  public userLogged: Professional;
  public author: Professional;

  constructor(
    private snackbar: MatSnackBar,
    private appservice: AppService,
    private openModalPeopleService: OpenModalPeopleService,
    private sessionService: SessionService,
    private router: Router) {}

  ngOnInit() {
    this.getLikes();
    this.appservice.retornarDadosUsuario(this.sessionService.getUserLogged())
    .subscribe(res =>{
      this.userLogged = res;
    });
    this.appservice.retornarDadosUsuario(this.publication.professionalID)
    .subscribe(res=>{
      this.author = res;
    })
    this.statusCurtida();

    //PARA TESTE
    // this.publication.videoUrl = "https://www.youtube.com/watch?v=zdYklPPFAZo";
    // this.publication.videoTitle = 'Zelda: Links Awakening'
    // this.publication.thumbnailUrl = 'https://img.youtube.com/vi/zdYklPPFAZo/hqdefault.jpg';
  }

  deletePublication() {
    this.clickedDeletPublication.emit(this.publication.publicationID)
  }

  curtirPublication() {
    this.appservice.likePublication(this.professionalLike, this.publication.publicationID)
      .subscribe(res => {
        this.snackbar.open('Publicação curtida!', 'Dismiss', {
          duration: 4000,
          panelClass: ['success-snackbar']
        });
        this.alreadyLikePost = true;
        this.likeList.push(this.userLogged);
        this.likeLength += 1;
      }, err => {
        console.log(err)
        this.snackbar.open(`${err.error}`, 'Dismiss', {
          duration: 4000,
          panelClass: ['error-snackbar']
        });
      })
  }

  descurtirPublication() {
    this.appservice.dislikePublication(this.professionalLike, this.publication.publicationID)
    .subscribe(res => {
      this.snackbar.open('Publicação descurtida!', 'Dismiss', {
        duration: 4000,
        panelClass: ['success-snackbar']
      });
      this.alreadyLikePost = false;
      this.appservice.getProfessionalsWhoReactedToPublication(this.publication.publicationID)
      .subscribe(res => {
        this.likeList = res;
        this.likeLength = res.length;
      });
    },err =>{
      console.log(err)
      this.snackbar.open(`${err.error}`, 'Dismiss', {
        duration: 4000,
        panelClass: ['error-snackbar']
      });
    })
  }

  getLikes() {
    this.appservice.getProfessionalsWhoReactedToPublication(this.publication.publicationID)
    .subscribe(res => {
      this.likeLength = res.length;
      this.likeList = res;
    }, err => {
      console.log(err);
      this.snackbar.open(`Erro buscar número de recomendações!`, 'Dismiss', {
        duration: 4000,
        panelClass: ['error-snackbar']
      });
    })
  }

  likesPessoas() {
    const data = { title: 'Curtidas', noneText: 'Ainda não há nenhuma curtida!', users: this.likeList }
    this.openModalPeopleService.openDialog(data)
      .subscribe(res => {
        // console.log('Modal de recomendacoes fechado');
      });
  }

  statusCurtida() {
    this.appservice.getStatusPublication(this.professionalLike, this.publication.publicationID)
      .subscribe(res => {
        if (res === 1) {
          this.alreadyLikePost = true;
        } else {
          this.alreadyLikePost = false;
        }
      }, err => {
        console.log(err);
      });
  }

  goTo() {
    const userId = this.author.professionalID;
    this.router.navigate([`postagens`, userId]);
  }
}
