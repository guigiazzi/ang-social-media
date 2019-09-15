import { Component } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { Router } from '@angular/router';
import { SessionService } from '../sessionService/session.service';


@Component({
  selector: 'app-header-toolbar',
  templateUrl: 'header-toolbar.component.html',
  styleUrls: ['./header-toolbar.component.css']
})

export class HeaderToolbarComponent {
  public searchUsers = [];

  constructor(private appservice: AppService, private router: Router, private sessionService: SessionService) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
   }

  logout(){
    this.sessionService.logoutUser();
    console.log(this.sessionService);
  }

  searchPosts(searchValue) {
    this.searchUsers = [];
    this.appservice.searchbar({name: searchValue})
    .subscribe(res => {
      res.forEach(pessoa => {
        this.searchUsers.push(pessoa);
      });
    });
  }

  goToHome(){
    let user = this.sessionService.getUserLogged();
    this.router.navigate([`postagens`, user]);
  }

  goTo(userId: string) {
    this.router.navigate([`postagens`, userId]);
  }
}
