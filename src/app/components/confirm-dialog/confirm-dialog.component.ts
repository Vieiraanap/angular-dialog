import { Component, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { ConfirmDialog } from 'src/app/models/confirm-dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent {

  @Input() data: ConfirmDialog = new ConfirmDialog();
  confirm: Subject<boolean>;

  constructor() {
    this.confirm = new Subject();
  }

  closeDialog() {
    this.confirm.next(false);
  }

  confirmDialog() {
    this.confirm.next(true);
  }
}
