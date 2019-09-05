import { Component, OnInit } from '@angular/core';
import { Publication } from './../interfaces/publication';
import { AppService }  from './../app.service';


@Component({
  selector: 'app-postagens',
  templateUrl: './postagens.component.html',
  styleUrls: ['./postagens.component.css']
})

export class PostagensComponent implements OnInit{
  public publication: Publication = <Publication>{};
  public isMyProfile = true;

  constructor(private appservice : AppService) { }

  ngOnInit(){
    this.publication.author = "Jaozin";
  }

  onSubmit() {
    console.warn('Ta ai sua postage', this.publication);
    this.appservice.cadastrarPublication(this.publication);
    this.publication.text = "";
  }
}
