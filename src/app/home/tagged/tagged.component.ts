import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Note } from '../../Models/Note';
import { NoteLook } from '../../Models/NoteLook';
import { NoteType } from '../../Models/NoteType';
import { IStorageService } from '../../app-service/IStorage.service';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-tagged',
  templateUrl: './tagged.component.html',
  styleUrls: ['./tagged.component.scss'],
})
export class TaggedComponent implements OnInit {
  labelledNotes: Observable<Note[]>;
  noteLook: NoteLook;
  label: string;
  path: string;
  noteType: string;

  ngOnInit(): void {
    this.noteLook = this.storageService.GetNoteLook();
    this.noteType = NoteType.custom;
  }

  constructor(private storageService: IStorageService, private router: Router) {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map((data: NavigationEnd) => {
          this.path = data.url;
          this.noteType = NoteType.custom;
          this.label = this.path.substr(8);
          this.labelledNotes = this.storageService.GetNotesByBucketLabel(
            this.label,
          );
        }),
      )
      .subscribe();
  }
}
