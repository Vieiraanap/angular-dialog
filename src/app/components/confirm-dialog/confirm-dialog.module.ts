import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmDialogComponent } from './confirm-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogModule } from '@angular/cdk/dialog';

@NgModule({
  imports: [
    CommonModule,
    DialogModule,
    MatDialogModule
  ],
  declarations: [ConfirmDialogComponent],
  exports: [ConfirmDialogComponent]
})
export class ConfirmDialogModule { }
