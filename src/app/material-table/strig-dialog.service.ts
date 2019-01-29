import { Injectable } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { StrigDialogComponent } from '../strig-dialog/strig-dialog.component';
@Injectable({
  providedIn: 'root'
})
export class StrigDialogService {

  constructor(private dialog:MatDialog) { }
  stringalert(msg){
    this.dialog.open(StrigDialogComponent,{
      width: '390px',
      height:'100px',
      panelClass: 'confirm-dialog-container',
      disableClose:true,
      data :{
        message:msg
      }
    });
  }
}
