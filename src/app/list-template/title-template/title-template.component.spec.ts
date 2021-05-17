import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TitleTemplateComponent } from './title-template.component';

describe('TitleTemplateComponent', () => {
  let component: TitleTemplateComponent;
  let fixture: ComponentFixture<TitleTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TitleTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TitleTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
