import { Component, OnInit } from '@angular/core';
import { Professional } from '../interfaces/professional';
import { AppService } from '../app.service';
import { SessionService } from '../shared/sessionService/session.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {
  public friends: Professional[] = [];
  public userLoggedId: string;
  public usuario: Professional = {} as Professional;
  public showSpinner = false;
  public imageFile;
  public userDefault = '../../assets/images/user-icon.jpg';

  constructor(
    private router: Router,
    private appservice: AppService,
    private snackbar: MatSnackBar,
    private sessionService: SessionService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.showSpinner = true;
    this.userLoggedId = this.sessionService.getUserLogged();
    this.usuario.professionalID = this.route.snapshot.paramMap.get('id');
    this.appservice.getListFriends(this.usuario.professionalID)
      .subscribe(res => {
        this.friends = res;
        console.log(this.friends);
        this.showSpinner = false;
        this.loadImage(this.friends);
      },
        err => {
          console.log(err);
          this.snackbar.open('Ocorreu um erro ao carregar a lista de Amigos!', 'Dismiss', {
            duration: 4000,
            panelClass: ['error-snackbar']
          });
          this.showSpinner = false;
        })
  }

  loadImage(friends: Professional[]) {
    friends.forEach(friend => {
      if (friend.profileImage !== null) {
        this.imageFile = this.sanitizer.bypassSecurityTrustUrl(btoa(friend.profileImage));
        console.log(this.imageFile);
      }
    });
  }

  goToUserProfile(id: String) {
    console.log(id);
    this.router.navigate([`friends`, id]);
  }

}