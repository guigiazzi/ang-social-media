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
  public publication: Publication = <Publication> {};
  public isMyProfile: boolean = true;
  public showSpinner: boolean = false;
  public userPublications: Publication[] = [];
  public numPublications: number;

  constructor(private appservice: AppService, private snackbar: MatSnackBar) { }

  ngOnInit() {
    this.publication.professionalID = '5d719baf5c15490004e1f21e';

    this.appservice.listrarPostagens({professionalID: '5d719baf5c15490004e1f21e'})
    .subscribe(publications=>{
      publications.forEach(publication => {
        this.userPublications.push(publication)
      });
      console.log(this.userPublications)
      this.numPublications = this.userPublications.length;
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
        this.userPublications.unshift(res)
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
