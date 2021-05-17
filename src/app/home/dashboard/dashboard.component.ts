import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Note } from '../../Models/Note';
import { NoteLook } from '../../Models/NoteLook';
import { NoteType } from '../../Models/NoteType';
import { IStorageService } from '../../app-service/IStorage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardContainerComponent implements OnInit {
  generalNotes: Observable<Note[]>;
  noteLook: NoteLook;
  noteType: NoteType;
  label: string;

  ngOnInit(): void {
    this.generalNotes = this.storageService.GetNotesByBucketLabel(
      NoteType.general,
    );
    this.noteLook = this.storageService.GetNoteLook();
    this.noteType = NoteType.general;
    this.label = NoteType.general;
  }

  constructor(private storageService: IStorageService) {}
}
