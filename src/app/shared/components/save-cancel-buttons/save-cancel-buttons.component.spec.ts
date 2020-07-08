import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveCancelButtonsComponent } from './save-cancel-buttons.component';

describe('SaveCancelButtonsComponent', () => {
  let component: SaveCancelButtonsComponent;
  let fixture: ComponentFixture<SaveCancelButtonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaveCancelButtonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveCancelButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
