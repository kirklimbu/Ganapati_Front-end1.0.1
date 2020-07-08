import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ganapati-save-cancel-buttons',
  templateUrl: './save-cancel-buttons.component.html',
  styleUrls: ['./save-cancel-buttons.component.scss']
})
export class SaveCancelButtonsComponent implements OnInit {

  @Output()
  save: EventEmitter<void> = new EventEmitter();

  @Output()
  cancel: EventEmitter<void> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  

}
