import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Publication } from 'src/app/interfaces/publication';
import { AppService } from './../../app.service';
import { MatSnackBar } from '@angular/material';
import { Professional } from 'src/app/interfaces/professional';
import { OpenModalPeopleService } from './../modal-people/open-modal-people-service.service';

@Component({
  selector: 'app-card-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.css']
})

export class PublicationComponent implements OnInit{
  @Input() publication;
  @Output() clickedDeletPublication = new EventEmitter();
  @Input() isMyProfile;
  @Input() professionalLike;
  public alreadyLikePost: boolean = false;
  public likeLength: number;
  public likeList = [];

  constructor(private snackbar: MatSnackBar, private appservice: AppService, private openModalPeopleService: OpenModalPeopleService) {}

  ngOnInit() {
    // this.getLikes();

    //PARA TESTE
    // this.publication.videoUrl = "https://www.youtube.com/watch?v=zdYklPPFAZo";
    // this.publication.videoTitle = 'Zelda: Links Awakening'
    // this.publication.thumbnailUrl = 'https://img.youtube.com/vi/zdYklPPFAZo/hqdefault.jpg';
    this.likeLength = 1;
    this.likeList = [{professionalID:'asidsasiaisa', name:'aaaaa'}]
  }

  deletePublication() {
    this.clickedDeletPublication.emit(this.publication.publicationID)
  }

  curtirPublication() {
    console.log('entrou')
    this.appservice.likePublication(this.professionalLike, this.publication.publicationID)
    .subscribe(res => {
      this.snackbar.open('Publicação curtida!', 'Dismiss', {
        duration: 4000,
        panelClass: ['success-snackbar']
      });
      this.alreadyLikePost = true;
    },err =>{
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
    },err =>{
      console.log(err)
      this.snackbar.open(`${err.error}`, 'Dismiss', {
        duration: 4000,
        panelClass: ['error-snackbar']
      });
    })
  }

  getLikes() {
    this.appservice.getNumbersOfLikePublication(this.publication.publicationID)
    .subscribe(res => {
      this.likeLength = res.length;
      this.likeList = res;
    }, err => {
      console.log(err);
      this.snackbar.open(`Erro buscar número de recomendações!`, 'Dismiss', {
        duration: 4000,
        panelClass: ['error-snackbar']
      });
    });
  }

  likesPessoas() {
    const data = {title: 'Curtidas', users: this.likeList}
    this.openModalPeopleService.openDialog(data)
    .subscribe(res=>{
      console.log('Modal de recomendacoes fechado');
    });
  }
}
