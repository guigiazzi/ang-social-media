import { Component, OnInit } from '@angular/core';
import { Professional } from '../interfaces/professional';
import { AppService } from '../app.service';
import { SessionService } from '../shared/sessionService/session.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

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
  public haveUserImg = false;
  public imageFile;

  constructor(
    private router: Router,
    private appservice: AppService,
    private snackbar: MatSnackBar,
    private sessionService: SessionService,
    private route: ActivatedRoute,
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
    },
    err => {
      console.log(err);
      this.snackbar.open('Ocorreu um erro ao carregar a lista de Amigos!', 'Dismiss', {
        duration: 4000,
        panelClass: ['error-snackbar']
      });
      this.showSpinner = false;
    })
    this.loadImage(this.friends);
  }
  loadImage(friends: Professional[]) {
    const imgName = 'userImg.jpeg'
    friends.forEach(friend => {
      if (friend.profileImage !== null) {
        const imageBlob = this.dataURItoBlob(friend.profileImage);
        this.imageFile = new File([imageBlob], imgName, { type: 'image/jpeg' });
      }
    });
  }
  dataURItoBlob(dataURI) {
    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: 'image/jpeg' });    
    return blob;
 }
 goToUserProfile(id:String){
   console.log(id);
   this.router.navigate([`friends`, id]);
 }
 
}