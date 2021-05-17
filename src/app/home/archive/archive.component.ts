import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Note } from '../../Models/Note';
import { NoteLook } from '../../Models/NoteLook';
import { NoteType } from '../../Models/NoteType';
import { IStorageService } from '../../app-service/IStorage.service';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss'],
})
export class ArchiveComponent implements OnInit {
  archiveNotes: Observable<Note[]>;
  noteLook: NoteLook;
  editorNote: Note;
  noteType: NoteType;
  label: string;

  constructor(private storageService: IStorageService) {
    this.archiveNotes = this.storageService.GetNotesByBucketLabel(
      NoteType.archive,
    );
    this.noteLook = this.storageService.GetNoteLook();
    this.noteType = NoteType.archive;
    this.label = NoteType.archive.toString();
  }

  ngOnInit(): void {
    this.editorNote = this.archiveNotes[0] || null;
  }
}
