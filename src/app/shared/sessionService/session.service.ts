import { Injectable, OnInit } from '@angular/core';
import { Professional } from 'src/app/interfaces/professional';

@Injectable()
export class SessionService {
  public userId: string;


  constructor() { }

  getUserLogged() {
    const userId = localStorage.getItem('user');
    if (!this.userId) {
      this.userId = userId;
    }
    return this.userId;
  }

  saveUserLoggedId(userId: string) {
    localStorage.setItem('user', userId);
    this.userId = userId;
  }

  logoutUser() {
    this.userId = '';
  }
}
