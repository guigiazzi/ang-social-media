import { Injectable } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { ModalPeopleComponent } from './modal-people.component';
import { Observable } from 'rxjs';

@Injectable()
export class OpenModalPeopleService {

  constructor(public dialog: MatDialog) { }

  openDialog(data): Observable<any> {
    return new Observable((observer) => {
      const title = data.title;
      const users = data.users
      const noneText = data.noneText;
      const dialogRef = this.dialog.open(ModalPeopleComponent, {
        width: '500px',
        data: { title, users, noneText }
      });

      dialogRef.afterClosed().subscribe(result => {
        observer.next(result);
        observer.complete();
      });
    });
  }
}
