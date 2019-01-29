import { Injectable } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
@Injectable({
  providedIn: 'root'
})
export class DialogSerService {

  constructor(private dialog:MatDialog) { }
  openconfirmDialog(msg){
  return  this.dialog.open(DialogBoxComponent,{
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
