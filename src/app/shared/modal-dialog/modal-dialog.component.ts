import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-modal-dialog',
  templateUrl: './modal-dialog.component.html',
  styleUrls: ['./modal-dialog.component.css']
})
export class ModalDialogComponent {
  

  constructor(public dialogRef: MatDialogRef<ModalDialogComponent>) { }

  onNoClick(): void {
    this.dialogRef.close(false);
  }
  
  onYesClick(): void {
    this.dialogRef.close(true);
  }

}
