import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-people',
  templateUrl: './modal-people.component.html',
  styleUrls: ['./modal-people.component.css']
})
export class ModalPeopleComponent {
  public title: string;
  public users: string;
  public buttonNo: string;
  public noneText: string;

  constructor(
    public dialogRef: MatDialogRef<ModalPeopleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router
    ) { }

  ngOnInit() {
    this.title = this.data.title;
    this.users = this.data.users;
    this.noneText = this.data.noneText;
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  goTo(professionalID: string) {
    this.router.navigate([`postagens`, professionalID]);
    this.dialogRef.close(false);
  }
}
