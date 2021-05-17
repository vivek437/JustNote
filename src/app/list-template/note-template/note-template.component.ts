import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  Output,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NoteLook } from '../../Models/NoteLook';
import { Note } from '../../Models/Note';

import {
  CreateDialogComponent,
  DialogResponse,
} from './create-dialog/create-dialog';
import { NoteType } from 'src/app/Models/NoteType';
import { EventEmitter } from 'events';

@Component({
  selector: 'app-note-template',
  templateUrl: './note-template.component.html',
  styleUrls: ['./note-template.component.scss'],
})
export class NoteTemplateComponent implements OnInit {
  @ViewChild('titleDiv') titleDiv: ElementRef;
  @ViewChild('contentDiv', { static: true }) contentDiv!: ElementRef;

  @Input() view: NoteLook;
  @Input() note: Note;
  @Input() noteType: NoteType;
  @Input() label: string;

  title = 'title';
  content = 'content';
  rectangleTitle = 'rectangleTitle';
  rectangleContent = 'rectangleContent';
  cssStyleShapes: string;
  cssStyleRectangles: string;

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    this.cssStyleRectangles = 'rectangle-' + (this.note.id % 11);
    this.cssStyleShapes = 'shape-' + (this.note.id % 11);
  }

  onClose() {}

  openEditor() {
    this.note.label = this.note.label || this.label;
    const dialogRef = this.dialog.open(CreateDialogComponent, {
      disableClose: true,
      data: this.note,
    });

    dialogRef.afterClosed().subscribe((response: DialogResponse) => {});
  }

  saveNote() {
    const updatedNote = new Note();
    updatedNote.id = this.note.id;
    updatedNote.title = this.titleDiv.nativeElement.innerText;
    updatedNote.content = this.contentDiv.nativeElement.innerText;
  }

  doNothing() {}
}
