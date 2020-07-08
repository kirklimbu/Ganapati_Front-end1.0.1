import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'ganapati-form-group',
  templateUrl: './form-group.component.html',
  styleUrls: ['./form-group.component.scss']
})
export class FormGroupComponent implements OnInit {
  // Props

  @Input()
  for: string = '';

  @Input()
  label: string = '';

  @Input()
  required = false;

  @Output()
  save: EventEmitter<void> = new EventEmitter();

  @Output()
  cancel: EventEmitter<void> = new EventEmitter();


  constructor(
    // private spinner:NgxSpinnerService;
  ) { }

  ngOnInit(): void {
  }

}
