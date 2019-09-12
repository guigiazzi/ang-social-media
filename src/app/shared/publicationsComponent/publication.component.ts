import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Publication } from 'src/app/interfaces/publication';

@Component({
  selector: 'app-card-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.css']
})

export class PublicationComponent {
  @Input() publication;
  @Output() clickedDeletPublication = new EventEmitter();

  constructor() {}

  deletePublication() {
    this.clickedDeletPublication.emit(this.publication.publicationID)
  }
}
