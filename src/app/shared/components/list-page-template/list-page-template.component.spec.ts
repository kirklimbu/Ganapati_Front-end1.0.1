import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPageTemplateComponent } from './list-page-template.component';

describe('ListPageTemplateComponent', () => {
  let component: ListPageTemplateComponent;
  let fixture: ComponentFixture<ListPageTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListPageTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPageTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
