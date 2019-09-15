import { Injectable, OnInit } from '@angular/core';
import { Professional } from 'src/app/interfaces/professional';

@Injectable()
export class SessionService {
  public userId: string;

  constructor() { }

  getUserLogged() {
    return this.userId;
  }

  saveUserLoggedId(userId: string) {
    console.log('param: '+userId);
    console.log('Inner '+this.userId);
    this.userId = userId;
  }

  logoutUser() {
    this.userId = '';
  }
}
