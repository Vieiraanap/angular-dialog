import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from './confirm-dialog.component';
import { ConfirmDialog } from 'src/app/models/confirm-dialog';

@Injectable({
  providedIn: 'root'
})
export class ConfirmDialogService {

  constructor(
    private dialog: MatDialog
  ) { }

  openConfirmDialog(dialogData?: ConfirmDialog) {
    const dialog = this.dialog.open(ConfirmDialogComponent).componentInstance;

    dialog.data.title = dialogData?.title ? dialogData?.title : 'Confirmar';
    dialog.data.message = dialogData?.message ? dialogData?.message : 'Tem certeza que deseja excutar esta ação?';
    dialog.data.titleConfirmAction = dialogData?.titleConfirmAction ? dialogData?.titleConfirmAction : 'Sim';
    dialog.data.titleCancelAction = dialogData?.titleCancelAction ? dialogData?.titleCancelAction : 'Não';

    return (<ConfirmDialogComponent>dialog).confirm;
  }
}
