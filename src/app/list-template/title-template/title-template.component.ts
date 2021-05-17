import { Component, Input, OnInit } from '@angular/core';
import { Note } from '../../Models/Note';
import { NoteLook } from '../../Models/NoteLook';

@Component({
  selector: 'app-title-template',
  templateUrl: './title-template.component.html',
  styleUrls: ['./title-template.component.scss'],
})
export class TitleTemplateComponent implements OnInit {
  @Input() view: NoteLook;
  @Input() note: Note;

  color: string;
  constructor() {}
  ngOnInit(): void {
    this.color = 'color-' + (this.note.id % 11);
  }
}
