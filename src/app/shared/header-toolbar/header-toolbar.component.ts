import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { Router } from '@angular/router';
import { SessionService } from '../sessionService/session.service';
import { Professional } from 'src/app/interfaces/professional';


@Component({
  selector: 'app-header-toolbar',
  templateUrl: 'header-toolbar.component.html',
  styleUrls: ['./header-toolbar.component.css']
})

export class HeaderToolbarComponent implements OnInit {
  public searchUsers = [];
  public usuario: string;
  constructor(private appservice: AppService, private router: Router, private sessionService: SessionService) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }
  ngOnInit(): void {
    this.appservice.retornarDadosUsuario(this.sessionService.userId)
    .subscribe(
      res => {
        this.usuario = res.profileType;
      }, err => {
        console.log(err);
      }
    );
  }

  logout() {
    this.sessionService.logoutUser();
  }

  searchPosts(searchValue) {
    if (!searchValue) {
      return
    }
    this.appservice.searchbar(searchValue)
      .subscribe(res => {
        this.searchUsers = [];
        res.forEach(pessoa => {
          this.searchUsers.push(pessoa);
        });
    });
  }

  goToProfile() {
    let user = this.sessionService.getUserLogged();
    this.router.navigate([`postagens`, user]);
  }

  goToHome() {
    this.router.navigate(['feed']);
  }

  goTo(userId: string) {
    this.router.navigate([`postagens`, userId]);
  }

  goToFriends() {
    this.router.navigate([`friends`, this.sessionService.getUserLogged()]);
  }

  goToGerente() {
    this.router.navigate([`gerente`]);
  }
}
