import { Component, OnInit, Input } from '@angular/core';
import { Publication } from 'src/app/interfaces/publication';

@Component({
  selector: 'app-card-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.css']
})

export class PublicationComponent {
  @Input() publication;

  constructor() {}

  deletePublication() {
    console.log(`aha`)
  }
}
