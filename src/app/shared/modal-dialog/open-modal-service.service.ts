import { Injectable } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { ModalDialogComponent } from './modal-dialog.component';
import { Observable } from 'rxjs';

@Injectable()
export class OpenModalService {

  constructor(public dialog: MatDialog) { }

  openDialog(data): Observable<any> {
    return new Observable((observer) => {
      const text = data.text;
      const title = data.title;
      const buttonNo = data.buttonNo;
      const buttonYes = data.buttonYes;
      const dialogRef = this.dialog.open(ModalDialogComponent, {
        width: '290px',
        data: { text, title, buttonYes, buttonNo }
      });

      dialogRef.afterClosed().subscribe(result => {
        observer.next(result);
        observer.complete();
      });
    });
  }
}
