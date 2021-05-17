import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Note } from '../Models/Note';
import { IStorageService } from '../app-service/IStorage.service';
import { NoteType } from '../Models/NoteType';
import { NoteLook } from '../Models/NoteLook';
import { MatDialog } from '@angular/material/dialog';
import { CreateDialogComponent } from './note-template/create-dialog/create-dialog';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list-template',
  templateUrl: './list-template.component.html',
  styleUrls: ['./list-template.component.scss'],
})
export class ListTemplateComponent implements OnInit, OnChanges {
  noteList: Note[];
  @Input() notes: Observable<Note[]>;
  @Input() noteLook: NoteLook;
  @Input() noteType: NoteType;
  @Input() label: string;

  editorNote: Note;

  ngOnChanges() {
    this.notes?.subscribe((data) => {
      this.noteList = data;
      this.editorNote = this.noteList[0];
    });
    this.noteLook = this.storageService.GetNoteLook();
  }

  ngOnInit(): void {}

  constructor(
    public dialog: MatDialog,
    private storageService: IStorageService,
  ) {}

  setEditor(note: Note) {
    this.editorNote = note;
  }

  updateNote(updatedNote: Note) {
    this.storageService.UpdateNote(updatedNote);
  }

  onCreate() {
    const note = new Note();
    note.isNew = true;
    note.isDeleted = false;
    note.label = this.label;
    const dialogRef = this.dialog.open(CreateDialogComponent, {
      disableClose: true,
      data: note,
    });
    dialogRef.afterClosed().subscribe(() => {});
  }

  changeLook() {
    this.noteLook = this.storageService.ChangeLook();
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.noteList, event.previousIndex, event.currentIndex);
    this.storageService.UpdateBucket(this.noteList);
  }
}
