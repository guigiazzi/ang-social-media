import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-header-toolbar',
  templateUrl: 'header-toolbar.component.html',
  styleUrls: ['./header-toolbar.component.css']
})

export class HeaderToolbarComponent {
  public searchUsers = [];

  constructor(private appservice: AppService) { }

  logout(){}

  searchPosts(searchValue) {
    this.searchUsers = [];
    this.appservice.searchbar({name: searchValue})
    .subscribe(res => {
      res.forEach(pessoa => {
        this.searchUsers.push(pessoa);
      });
      console.log(this.searchUsers);
    });
  }
}
