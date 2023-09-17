import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogData } from './models/dialog-data';
import { DialogSizeEnum } from './models/enum/dialog-size.enum.enum';
import { DialogComponent } from './components/dialog/dialog.component';
import { ConfirmDialogService } from './components/confirm-dialog/confirm-dialog.service';
import { take, switchMap, EMPTY } from 'rxjs';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-dialog';

  constructor(
    public dialog: MatDialog,
    private confirmDialogService: ConfirmDialogService,
    private dataService: DataService
  ) {}

  openDialog(dialogSize: DialogSizeEnum): void {
    let dialogData = new DialogData<string>({
      title: dialogSize.toUpperCase(),
      size: dialogSize,
      object: `This is a ${dialogSize} dialog`
    });

    this.dialog.open(DialogComponent, {
			data: dialogData,
		});
  }

  openConfirmDialog(): void {
    const confirm$ = this.confirmDialogService.openConfirmDialog();
    confirm$.asObservable().pipe(
      take(1),
      switchMap(confirm => confirm ? this.dataService.mockRequest(true, {status: 200}) : this.dataService.mockRequest(false, {status: 400}))
    ).subscribe(
      (data) => console.log(data)
    );
  }

  get dialogSize() {
    return DialogSizeEnum;
  }
}
