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
  public userPublications: Publication[] = [
    {professionalID:'sdsdsdss', publicationDate: new Date(), text:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ac nisl sit amet sapien tincidunt auctor eget eget nibh. Curabitur est risus, tempus quis sapien volutpat, aliquet ultrices odio. Sed tempor, odio vitae semper faucibus, augue sem tristique ex, quis feugiat justo turpis sit amet felis. Sed tristique lectus neque, sit amet cursus lectus laoreet ut. Sed euismod condimentum semper. Aenean tincidunt mollis mi, quis mollis odio imperdiet id. Phasellus eu nisi orci. Aenean elementum ultricies rhoncus. Donec rhoncus tempus semper. Vestibulum porta nisi eget massa facilisis, nec vestibulum mauris fermentum. Phasellus massa dolor, euismod vitae elit eu, laoreet laoreet elit. Nam a odio dui. Donec eget orci ac lorem volutpat fermentum. Phasellus commodo felis risus, vel consectetur lacus tempor convallis. Duis mollis magna nec ante vehicula, a lacinia mauris euismod.', author:'Joanzito'},
    {professionalID:'sdsdsdss', publicationDate: new Date(), text:'Nunc tempor sapien eu nunc accumsan aliquet. Curabitur nec feugiat elit. Integer sed mi neque. Vivamus orci eros, rhoncus vel nisi in, dictum tristique nulla. Sed in quam efficitur, ullamcorper eros consectetur, ornare ex. Sed id malesuada ex. Pellentesque accumsan purus efficitur vestibulum pulvinar. Ut ac posuere enim. Nullam consequat dictum molestie. Ut eu ornare nulla, ut pretium felis. Nam sit amet velit ante. Vivamus ullamcorper dui et magna posuere luctus. Etiam luctus, nulla at posuere vulputate, nisi neque ultrices dui, nec aliquam metus est in dolor.', author:'Joanzito'},
    {professionalID:'sdsdsdss', publicationDate: new Date(), text:'Phasellus non ultrices felis. Phasellus venenatis odio imperdiet quam volutpat porttitor quis vitae diam. Sed vel arcu arcu. Etiam vestibulum euismod tortor, blandit elementum augue pulvinar auctor. Pellentesque eleifend rutrum sem vitae mollis. Integer eleifend elit vitae sagittis varius. Proin sed venenatis lectus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae;', author:'Joanzito'},
    {professionalID:'sdsdsdss', publicationDate: new Date(), text:'sdsddsdssdsds', author:'Joanzito'},
    {professionalID:'sdsdsdss', publicationDate: new Date(), text:'sdsddsdssdsds', author:'Joanzito'},
  ];

  constructor(private appservice: AppService, private snackbar: MatSnackBar) { }

  ngOnInit() {
    this.publication.professionalID = '5d719baf5c15490004e1f21e';
    this.publication.text = '';
  }

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
