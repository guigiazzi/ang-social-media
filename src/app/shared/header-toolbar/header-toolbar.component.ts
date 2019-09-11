import { Component } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-toolbar',
  templateUrl: 'header-toolbar.component.html',
  styleUrls: ['./header-toolbar.component.css']
})

export class HeaderToolbarComponent {
  public searchUsers = [];

  constructor(private appservice: AppService, private router: Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
   }

  logout(){}

  searchPosts(searchValue) {
    this.searchUsers = [];
    this.appservice.searchbar({name: searchValue})
    .subscribe(res => {
      res.forEach(pessoa => {
        this.searchUsers.push(pessoa);
      });
    });
  }

  goTo(userId: string) {
    this.router.navigateByUrl(`postagens/${userId}`);
  }
}
