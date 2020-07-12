import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MortgageDetailFormComponent } from './mortgage-detail-form.component';

describe('MortgageDetailFormComponent', () => {
  let component: MortgageDetailFormComponent;
  let fixture: ComponentFixture<MortgageDetailFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MortgageDetailFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MortgageDetailFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
