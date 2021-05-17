import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Note } from '../../Models/Note';
import { NoteLook } from '../../Models/NoteLook';
import { NoteType } from '../../Models/NoteType';
import { IStorageService } from '../../app-service/IStorage.service';

@Component({
  selector: 'app-reminders',
  templateUrl: './reminders.component.html',
  styleUrls: ['./reminders.component.scss'],
})
export class RemindersComponent implements OnInit {
  @Input() reminderNotes: Observable<Note[]>;
  noteLook: NoteLook;
  noteType: NoteType;
  label: string;

  constructor(private storageService: IStorageService) {
    this.reminderNotes = this.storageService.GetNotesByBucketLabel(
      NoteType.reminder,
    );
    this.noteLook = this.storageService.GetNoteLook();
    this.noteType = NoteType.reminder;
    this.label = NoteType.reminder.toString();
  }

  ngOnInit(): void {}
}
