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
    this.userId = userId;
  }

  logoutUser() {
    this.userId = '';
  }
}
