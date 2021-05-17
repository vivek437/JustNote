import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteActionComponent } from './note-action.component';

describe('NoteActionComponent', () => {
  let component: NoteActionComponent;
  let fixture: ComponentFixture<NoteActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NoteActionComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
