import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { DialogData } from 'src/app/models/dialog-data';
import { ConfirmDialog } from 'src/app/models/interfaces/confirm-dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {

  data: ConfirmDialog;
  confirm: Subject<boolean>;

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: DialogData<ConfirmDialog>,
  ) {
    this.data = dialogData.object;
  }

  ngOnInit() {
  }

  closeDialog() {
    this.confirm.next(false);
  }

  confirmDialog() {
    this.confirm.next(true);
  }
}
