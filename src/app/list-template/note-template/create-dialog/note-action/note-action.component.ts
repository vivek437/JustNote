import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Note } from '../../../../Models/Note';
import { IStorageService } from '../../../../app-service/IStorage.service';

@Component({
  selector: 'app-note-action',
  templateUrl: './note-action.component.html',
  styleUrls: ['./note-action.component.scss'],
})
export class NoteActionComponent implements OnInit {
  @Input() editorNote: Note;
  @Input() layout: string;
  @Input() label: string;
  @Input() allBuckets: string[];
  @Output() closeEmitter = new EventEmitter();
  @Output() clearEmitter = new EventEmitter();
  defaultLabels: string[];
  allLabels: string[];

  constructor(private storageService: IStorageService) {}

  ngOnInit() {
    this.defaultLabels = this.storageService.GetDefaultBuckets();
    this.defaultLabels.splice(3, 1);
    this.storageService.GetAllCustomBuckets().subscribe((data) => {
      this.allLabels = this.defaultLabels;
      this.allLabels = this.allLabels.concat(data);
      this.allLabels.forEach((x, index) => {
        if (x === this.label) {
          this.allLabels.splice(index, 1);
        }
      });
    });
  }

  setEditor(note: Note) {
    this.editorNote = note;
  }

  clearEditor() {
    this.editorNote.title = '';
    this.editorNote.content = '';
    this.clearEmitter.emit();
  }

  deleteNote(note: Note) {
    if (note.isDeleted === true) {
      this.storageService.DeleteFromTrash(note);
      this.closeEmitter.emit();
      return;
    } else {
      note.isDeleted = true;
      this.storageService.DeleteNote(note, true);
      this.closeEmitter.emit();
    }
  }

  moveNote(note: Note, moveToLabel: string) {
    this.storageService.MoveNote(note, moveToLabel);
    this.editorNote = null;
    this.closeEmitter.emit();
  }

  cloneNote(note: Note) {
    this.storageService.CreateNote(note);
    this.closeEmitter.emit();
  }

  updateNote(updatedNote: Note) {
    this.storageService.UpdateNote(updatedNote);
    this.closeEmitter.emit();
  }

  recycle(note: Note) {
    this.storageService.RecycleNote(note);
    this.closeEmitter.emit();
  }

  onDownload(note: Note) {
    const fileContent = note.content || '';
    fileContent.replace(/([^\r])\n/g, '$1\r\n');
    const bb = new Blob([fileContent], { type: 'text/plain;' });
    const a = document.createElement('a');
    a.download = note.title;
    a.href = window.URL.createObjectURL(bb);
    a.click();
  }
}
