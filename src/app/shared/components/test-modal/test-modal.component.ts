import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  animal: string;
  name: string;
}
@Component({
  selector: 'app-test-modal',
  templateUrl: './test-modal.component.html',
  styleUrls: ['./test-modal.component.scss']
})
export class TestModalComponent {

  animal: string;
  name: string;
  constructor(
    public dialogRef: MatDialogRef<TestModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }


    onYes(){

    }

    onNo(){
      
    }

}
