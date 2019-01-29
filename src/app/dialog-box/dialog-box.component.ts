import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA,MatDialogRef } from '@angular/material';
import { injectAttribute } from '@angular/core/src/render3';
import {MatDialogModule} from '@angular/material';
@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.css']
})
export class DialogBoxComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA)public data,
    public dialogRef:MatDialogRef<DialogBoxComponent>) { }
    closeme(){
    this.dialogRef.close();
  }
  ngOnInit() {
  }

}
