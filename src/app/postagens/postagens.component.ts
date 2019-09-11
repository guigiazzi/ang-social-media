import { Component, OnInit } from '@angular/core';
import { Publication } from './../interfaces/publication';
import { AppService } from './../app.service';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { FormatDateService } from './../shared/formatDateService/format-date.service';
import { SessionService } from './../shared/sessionService/session.service';

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

  constructor(
    private appservice: AppService,
    private snackbar: MatSnackBar,
    private route: ActivatedRoute,
    private formatDateService: FormatDateService,
    private sessionService: SessionService
    ) { }

  ngOnInit() {
    this.sessionService.saveUserLoggedId('5d719baf5c15490004e1f21e');
    const userLoggedId = this.sessionService.getUserLogged();
    this.publication.professionalID = this.route.snapshot.paramMap.get('id');
    if (userLoggedId === this.publication.professionalID) {
      this.isMyProfile = true;
    }
    this.listarPostagens(this.publication.professionalID);
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

}
