import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA,MatDialogRef } from '@angular/material';
@Component({
  selector: 'app-strig-dialog',
  templateUrl: './strig-dialog.component.html',
  styleUrls: ['./strig-dialog.component.css']
})
export class StrigDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA)public data,
  public dialogRef:MatDialogRef<StrigDialogComponent>) { }

  ngOnInit() {
  }
  closeme(){
    this.dialogRef.close();
  }
}
