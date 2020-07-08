import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ganapati-list-page-template',
  templateUrl: './list-page-template.component.html',
  styleUrls: ['./list-page-template.component.scss']
})
export class ListPageTemplateComponent implements OnInit {


  @Input()
  heading: string;

  @Input()
  enableAdd = true;

  @Input()
  enableSearch = true;

  @Input()
  enableActiveLink = false;


  @Output()
  search: EventEmitter<string> = new EventEmitter();

  @Output()
  add: EventEmitter<void> = new EventEmitter();


  list = false;
  constructor() { }

  ngOnInit(): void {
  }
  onAdd() {
    this.add.emit();
  }

  onSearch() {
    this.search.emit();
  }

}
