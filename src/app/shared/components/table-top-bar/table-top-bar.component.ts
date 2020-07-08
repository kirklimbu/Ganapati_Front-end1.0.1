import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ganapati-table-top-bar',
  templateUrl: './table-top-bar.component.html',
  styleUrls: ['./table-top-bar.component.scss']
})
export class TableTopBarComponent implements OnInit {

  isSearchShowing = false;

  @Input()
  enableSearch = true;

  @Input()
  enableAdd = true;

  keyword: string;

  @Output()
  add: EventEmitter<void> = new EventEmitter();

  @Output()
  search: EventEmitter<void> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onAdd() {
    
    console.log('add click emitted');

    this.add.emit();
  }

  onSearch(){
    this.search.emit();
  }

}
