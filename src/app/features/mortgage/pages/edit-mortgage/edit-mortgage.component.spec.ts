import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMortgageComponent } from './edit-mortgage.component';

describe('EditMortgageComponent', () => {
  let component: EditMortgageComponent;
  let fixture: ComponentFixture<EditMortgageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditMortgageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMortgageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
