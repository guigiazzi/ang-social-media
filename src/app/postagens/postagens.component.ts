import { Component, OnInit } from '@angular/core';
import { Publication } from './../interfaces/publication';
import { AppService } from './../app.service';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { FormatDateService } from './../shared/formatDateService/format-date.service';
import { SessionService } from './../shared/sessionService/session.service';
import { Professional } from '../interfaces/professional';

@Component({
  selector: 'app-postagens',
  templateUrl: './postagens.component.html',
  styleUrls: ['./postagens.component.css']
})

export class PostagensComponent implements OnInit {
  public publication: Publication = {} as Publication;
  public isMyProfile = false;
  public showSpinner = false;
  public userPublications: Publication[] = [];
  public numPublications: number;
  public usuario: Professional = {} as Professional;
  public topics = [];

  constructor(
    private appservice: AppService,
    private snackbar: MatSnackBar,
    private route: ActivatedRoute,
    private formatDateService: FormatDateService,
    private sessionService: SessionService
    ) { }

  ngOnInit() {
    const userLoggedId = this.sessionService.getUserLogged();
    this.usuario.professionalID = this.route.snapshot.paramMap.get('id');
    if (userLoggedId === this.usuario.professionalID) {
      this.isMyProfile = true;
    }
    this.retornaDadosUsuarios(this.usuario.professionalID);
    this.listarPostagens(this.usuario.professionalID);
  }

  onSubmit() {
    this.showSpinner = true;
    console.log(this.publication)
    this.appservice.cadastrarPublication(this.publication)
      .subscribe(res => {
        console.log(res);
        this.snackbar.open('Publicação feita com sucesso!', 'Dismiss', {
          duration: 4000,
          panelClass: ['success-snackbar']
        });
        res.publicationDate = this.formatDateService.formatDate(res.publicationDate);
        this.showSpinner = false;
        this.userPublications.unshift(res);
      }, err => {
        console.log(err);
        this.snackbar.open('Ocorreu um erro ao publicar!', 'Dismiss', {
          duration: 4000,
          panelClass: ['error-snackbar']
        });
        this.showSpinner = false;
      });
    this.publication.text = '';
  }

  listarPostagens(userId: string) {
    this.appservice.listrarPostagens(userId)
    .subscribe(publications => {
      publications.forEach(publication => {
        publication.publicationDate = this.formatDateService.formatDate(publication.publicationDate);
        this.userPublications.push(publication);
      });
      this.numPublications = this.userPublications.length;
      console.log(this.userPublications.length);
    }, err => {
      this.snackbar.open('Ocorreu um erro ao listar as publicações!', 'Dismiss', {
        duration: 4000,
        panelClass: ['error-snackbar']
      });
      this.numPublications = this.userPublications.length;
      console.log(err);
    });
  }

  retornaDadosUsuarios(user) {
    this.appservice.retornarDadosUsuario(user)
      .subscribe(user => {
        if (user.birthDate) {
          user.birthDate = this.formatDateService.formatDatewithoutHour(user.birthDate);
        }
        if (user.careerDate) {
          user.careerDate = this.formatDateService.formatDatewithoutHour(user.careerDate);
        }
        this.usuario = user;
      });
      this.topics = ['1','2','3','4'];
  }
}
