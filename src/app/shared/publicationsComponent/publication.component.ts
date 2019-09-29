import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Publication } from 'src/app/interfaces/publication';
import { AppService } from './../../app.service';
import { MatSnackBar } from '@angular/material';

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

  constructor(private snackbar: MatSnackBar, private appservice: AppService) {}

  ngOnInit() {
    // this.publication.videoUrl = "https://www.youtube.com/watch?v=zdYklPPFAZo";
    // this.publication.videoTitle = 'Zelda: Links Awakening'
    // this.publication.thumbnailUrl = 'https://img.youtube.com/vi/zdYklPPFAZo/hqdefault.jpg';
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
    },err =>{
      console.log(err)
      this.snackbar.open(`${err.error}`, 'Dismiss', {
        duration: 4000,
        panelClass: ['error-snackbar']
      });
    })
  }
}
