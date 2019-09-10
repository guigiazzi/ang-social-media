import { Component, OnInit } from '@angular/core';
import { Publication } from './../interfaces/publication';
import { AppService } from './../app.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-postagens',
  templateUrl: './postagens.component.html',
  styleUrls: ['./postagens.component.css']
})

export class PostagensComponent implements OnInit {
  public publication: Publication = {} as Publication;
  public isMyProfile = true;
  public showSpinner = false;
  public userPublications: Publication[] = [];
  public numPublications: number;

  constructor(private appservice: AppService, private snackbar: MatSnackBar) { }

  ngOnInit() {
    this.publication.professionalID = '5d719baf5c15490004e1f21e';

    this.appservice.listrarPostagens({professionalID: '5d719baf5c15490004e1f21e'})
    .subscribe(publications => {
      publications.forEach(publication => {
        const hour = new Date(publication.publicationDate).getHours();
        const minutes = new Date(publication.publicationDate).getMinutes();

        publication.publicationDate = publication.publicationDate.substr(0, 10);
        publication.publicationDate = new Date(publication.publicationDate.replace(/-/g, '\/'));
        publication.publicationDate =  ('0' + publication.publicationDate.getDate()).substr(-2) + '/'
        + ('0' + (publication.publicationDate.getMonth() + 1)).substr(-2) + '/' + publication.publicationDate.getFullYear();

        if (minutes < 10) {
          publication.publicationDate = (`${hour}` + ':' + `0` + `${minutes}` + ` - ` + publication.publicationDate);
        } else {
          publication.publicationDate = (`${hour}` + ':' + `${minutes}` + ` - ` + publication.publicationDate);
        }
        this.userPublications.push(publication);
      });
      this.numPublications = this.userPublications.length;
    }, err => {
      this.snackbar.open('Ocorreu um erro ao listar as publicações!', 'Dismiss', {
        duration: 4000,
        panelClass: ['error-snackbar']
      });
      console.log(err);
    });
  }

  onSubmit() {
    this.showSpinner = true;
    this.appservice.cadastrarPublication(this.publication)
      .subscribe(res => {
        console.log(res);
        this.snackbar.open('Publicação feita com sucesso!', 'Dismiss', {
          duration: 4000,
          panelClass: ['success-snackbar']
        });
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
}
