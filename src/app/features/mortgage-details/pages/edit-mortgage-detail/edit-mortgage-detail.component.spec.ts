import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMortgageDetailComponent } from './edit-mortgage-detail.component';

describe('EditMortgageDetailComponent', () => {
  let component: EditMortgageDetailComponent;
  let fixture: ComponentFixture<EditMortgageDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditMortgageDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMortgageDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
