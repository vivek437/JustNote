import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NoteAction } from '../../../Models/NoteAction';
import { Note } from '../../../Models/Note';

export class DialogResponse {
  action: NoteAction;
  note: Note;
}
@Component({
  selector: 'app-create',
  templateUrl: './create-dialog.html',
  styleUrls: ['./create-dialog.scss'],
})
export class CreateDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<CreateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Note,
  ) {
    this.note = data;
  }

  note: Note;

  ngOnInit(): void {}

  onClear(): void {
    this.note.title = '';
    this.note.content = '';
  }

  onClose(): void {
    const response = new DialogResponse();
    response.action = NoteAction.noAction;
    this.dialogRef.close(response);
  }
}
