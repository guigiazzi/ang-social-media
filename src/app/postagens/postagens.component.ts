import { Component, OnInit } from '@angular/core';
import { Publication } from './../interfaces/publication';
import { AppService }  from './../app.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-postagens',
  templateUrl: './postagens.component.html',
  styleUrls: ['./postagens.component.css']
})

export class PostagensComponent implements OnInit{
  public publication: Publication = <Publication>{};
  public isMyProfile = true;

  constructor(private appservice : AppService, private snackbar : MatSnackBar) { }

  ngOnInit(){
    this.publication.author = "Jaozin";
  }

  onSubmit() {
    console.warn('Ta ai sua postage', this.publication);
    this.appservice.cadastrarPublication(this.publication)
      .subscribe(res =>{
        console.log(res)
        this.snackbar.open('Publicação feita com sucesso!', 'Dismiss', {
          duration:5000,
          panelClass: ['snackbar']
        });
      }, err=>{
        console.log(err);
        this.snackbar.open('Publicação não foi feita com sucesso!', 'Dismiss', {
          duration:5000,
          panelClass: ['blue-snackbar']
        });
      });
    this.publication.text = "";
  }
}
