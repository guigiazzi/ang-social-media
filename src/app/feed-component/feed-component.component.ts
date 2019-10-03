import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { FormatDateService } from '../shared/formatDateService/format-date.service';
import { SessionService } from '../shared/sessionService/session.service';
import { Publication } from '../interfaces/publication';

@Component({
  selector: 'app-feed-component',
  templateUrl: './feed-component.component.html',
  styleUrls: ['./feed-component.component.css']
})
export class FeedComponent implements OnInit {
  public usersPublications: Publication[] = [];
  public isMyProfile: boolean = false;
  public userLoggedId: string;

  constructor(private appService: AppService, private formatDateService: FormatDateService, private sessionService: SessionService) { }

  ngOnInit() {
    this.userLoggedId = this.sessionService.getUserLogged();
    this.appService.getFeedPublications(this.userLoggedId)
    .subscribe(res =>{
      res.forEach(post => {
        post.publicationDate = this.formatDateService.formatDate(post.publicationDate)
      });
      this.usersPublications = res;
    })
  }

}