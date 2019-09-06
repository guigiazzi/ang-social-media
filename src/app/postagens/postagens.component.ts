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
  public isMyProfile = true;

  constructor(private appservice: AppService, private snackbar: MatSnackBar) { }

  ngOnInit() {
    this.publication.author = 'Jaozin';
    this.publication.text = 'sjbfssdusdds';
;  }

  onSubmit() {
    console.warn('Ta ai sua postage', this.publication);
    this.appservice.cadastrarPublication(this.publication)
      .subscribe(res => {
        console.log(res);
        this.snackbar.open('Publicação feita com sucesso!', 'Dismiss', {
          duration: 4000,
          panelClass: ['success-snackbar']
        });
      }, err => {
        console.log(err);
        this.snackbar.open('Ocorreu um erro ao publicar!', 'Dismiss', {
          duration: 4000,
          panelClass: ['error-snackbar']
        });
      });
    this.publication.text = '';
  }
}
