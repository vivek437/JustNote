import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Note } from '../../Models/Note';
import { NoteLook } from '../../Models/NoteLook';
import { NoteType } from '../../Models/NoteType';
import { IStorageService } from '../../app-service/IStorage.service';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.scss'],
})
export class TrashComponent implements OnInit {
  @Input() trashNotes: Observable<Note[]>;
  label: string;
  noteLook: NoteLook;
  noteType: NoteType.trash;

  constructor(private storageService: IStorageService) {
    this.trashNotes = this.storageService.GetNotesByBucketLabel(NoteType.trash);
    this.noteLook = this.storageService.GetNoteLook();
    this.noteType = NoteType.trash;
    this.label = NoteType.trash.toString();
  }

  ngOnInit(): void {}
}
