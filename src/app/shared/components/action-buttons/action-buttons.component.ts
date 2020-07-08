import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'ganapati-action-buttons',
  templateUrl: './action-buttons.component.html',
  styleUrls: ['./action-buttons.component.scss']
})
export class ActionButtonsComponent implements OnInit {

  // props
  @Input()
  enableEdit = true;

  @Input()
  enableAdd = true;

  @Input()
  enableDelete = true;


  @Output()
  edit: EventEmitter<void> = new EventEmitter();

  @Output()
  add: EventEmitter<void> = new EventEmitter();

  @Output()
  delete: EventEmitter<void> = new EventEmitter();

  constructor(
    public dialog: MatDialog

  ) { }


  ngOnInit(): void {
  }


  onEdit() {

    this.edit.emit();
  }

  onAdd() {
    this.add.emit();
  }
  
  onDelete() {

    this.delete.emit();
  }

}
