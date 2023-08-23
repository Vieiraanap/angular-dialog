import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../../models/dialog-data';

@Component({
  selector: 'dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
		@Inject(MAT_DIALOG_DATA) public dialogData: DialogData<any>
  )
  {
    if(typeof this.dialogRef.addPanelClass === 'function')
			this.dialogRef.addPanelClass('dialog-panel');
		if(this.dialogRef._containerInstance && this.dialogRef._containerInstance._config)
			this.dialogRef._containerInstance._config.autoFocus = false;
  }

}
