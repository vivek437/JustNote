import { Injectable } from '@angular/core';
import { IStorageService } from './IStorage.service';
import { Note } from '../Models/Note';
import { NoteType } from '../Models/NoteType';
import { NoteLook } from '../Models/NoteLook';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StorageService extends IStorageService {
  noteLook: NoteLook;
  defaultBucketsLabels: string[];
  private customBuckets$: BehaviorSubject<string[]> = new BehaviorSubject<
    string[]
  >([]);

  private BucketLabelObservableMap: Map<
    string,
    BehaviorSubject<Note[]>
  > = new Map<string, BehaviorSubject<Note[]>>();

  constructor() {
    super();
    this.defaultBucketsLabels = [
      NoteType.general,
      NoteType.reminder,
      NoteType.archive,
      NoteType.trash,
    ];
    this._InitializeAppState();
  }

  GetNoteLook(): number {
    this.noteLook = JSON.parse(localStorage.getItem('noteLook')) || 0;
    return this.noteLook;
  }

  private _InitializeAppState() {
    // Default Buckets
    this.defaultBucketsLabels.forEach((defaultLabel, index) => {
      const temp = new BehaviorSubject<Note[]>(
        JSON.parse(localStorage.getItem(defaultLabel)) || [],
      );
      this.BucketLabelObservableMap.set(defaultLabel, temp);
    });

    // Custom Buckets
    let customBuckets;
    this.customBuckets$.next(
      JSON.parse(localStorage.getItem(NoteType.custom)) || [],
    );
    this.customBuckets$.subscribe((data) => (customBuckets = data));

    customBuckets.forEach((customLabel, index) => {
      const temp = new BehaviorSubject<Note[]>(
        JSON.parse(localStorage.getItem(customLabel)) || [],
      );
      this.BucketLabelObservableMap.set(customLabel, temp);
    });
  }

  GetDefaultBuckets(): string[] {
    return this.defaultBucketsLabels;
  }

  GetAllCustomBuckets(): Observable<string[]> {
    return this.customBuckets$;
  }

  CreateCustomBucket(newBucketLabel: string) {
    let label = JSON.parse(localStorage.getItem(NoteType.custom)) || [];
    label.push(newBucketLabel);
    label = label.sort((a, b) => {
      return b.id - a.id;
    });
    localStorage.setItem(NoteType.custom, JSON.stringify(label));

    this.BucketLabelObservableMap.set(
      newBucketLabel,
      new BehaviorSubject<Note[]>([]),
    );

    this.customBuckets$.next(
      JSON.parse(localStorage.getItem(NoteType.custom)) || [],
    );
    localStorage.setItem(newBucketLabel, JSON.stringify(''));
  }

  DeleteBucket(deleteBucket: string) {
    const labels = JSON.parse(localStorage.getItem(NoteType.custom)) || [];
    labels.forEach((label, index) => {
      // tslint:disable-next-line:triple-equals
      if (label === deleteBucket) {
        labels.splice(index, 1);
        localStorage.setItem(NoteType.custom, JSON.stringify(labels));
        return;
      }
    });
    localStorage.removeItem(deleteBucket);
    this.BucketLabelObservableMap.delete(deleteBucket);
    this.customBuckets$.next(labels);
  }

  CreateNote(note: Note) {
    const obs = this.BucketLabelObservableMap.get(note.label);
    let bucket = obs.getValue();
    bucket.push({
      id: bucket.length > 0 ? +bucket[0].id + 1 : 1,
      title: note.title,
      content: note.content,
      isDeleted: note.isDeleted,
      isNew: false,
      label: note.label,
      time: undefined,
    });
    bucket = bucket.sort((a, b) => {
      return b.id - a.id;
    });
    localStorage.setItem(note.label, JSON.stringify(bucket));
    obs.next(JSON.parse(localStorage.getItem(note.label)) || []);
    this.BucketLabelObservableMap.set(note.label, obs);
  }

  UpdateNote(updateNote: Note) {
    const obs = this.BucketLabelObservableMap.get(updateNote.label);
    const bucket = obs.getValue();

    if (updateNote.id === undefined) {
      this.CreateNote(updateNote);
      return;
    }

    bucket.forEach((note, index) => {
      // tslint:disable-next-line:triple-equals
      if (note.id == updateNote.id) {
        bucket[index].title = updateNote.title;
        bucket[index].content = updateNote.content;
      }
    });
    localStorage.setItem(updateNote.label, JSON.stringify(bucket));
  }

  DeleteNote(deleteNote: Note, moveToTrash?: boolean) {
    const bucketLabel = deleteNote.label;
    const obs = this.BucketLabelObservableMap.get(bucketLabel);
    const bucket = obs.getValue();
    bucket.forEach((note, index) => {
      // tslint:disable-next-line:triple-equals
      if (note.id == deleteNote.id) {
        bucket.splice(index, 1);
        localStorage.setItem(bucketLabel, JSON.stringify(bucket));
        return;
      }
    });
    localStorage.setItem(bucketLabel, JSON.stringify(bucket));
    obs.next(JSON.parse(localStorage.getItem(bucketLabel)) || []);
    this.BucketLabelObservableMap.set(bucketLabel, obs);
    if (moveToTrash) {
      this._AddToTrash(deleteNote);
    }
  }

  DeleteFromTrash(deleteNote: Note) {
    const bucketLabel = NoteType.trash;
    const obs = this.BucketLabelObservableMap.get(bucketLabel);
    const bucket = obs.getValue();
    bucket.forEach((note, index) => {
      // tslint:disable-next-line:triple-equals
      if (note.id == deleteNote.id) {
        bucket.splice(index, 1);
        localStorage.setItem(bucketLabel, JSON.stringify(bucket));
        return;
      }
    });
    localStorage.setItem(bucketLabel, JSON.stringify(bucket));
    obs.next(JSON.parse(localStorage.getItem(bucketLabel)) || []);
    this.BucketLabelObservableMap.set(bucketLabel, obs);
  }

  GetNotesByBucketLabel(bucketLabel: string): Observable<Note[]> {
    const noteList = JSON.parse(localStorage.getItem(bucketLabel)) || [];
    const obs = this.BucketLabelObservableMap.get(bucketLabel);
    if (obs !== undefined) {
      obs.next(noteList);
    }
    return obs;
  }

  RecycleNote(recycleNote: Note) {
    this.DeleteFromTrash(recycleNote);
    recycleNote.isDeleted = false;
    this.CreateNote(recycleNote);
  }

  MoveNote(note: Note, moveToLabel: string) {
    this.DeleteNote(note);
    note.label = moveToLabel;
    this.CreateNote(note);
  }

  UpdateBucket(list: Note[]) {
    const obs = this.BucketLabelObservableMap.get(list[0].label);
    obs.next(list);
    localStorage.setItem(list[0].label, JSON.stringify(list));
  }

  ChangeLook(): NoteLook {
    let x = this.noteLook;
    x = (x + 1) % 3;
    this.noteLook = x;
    localStorage.setItem('noteLook', JSON.stringify(x));
    // tslint:disable-next-line:triple-equals
    if (x == 0) {
      return NoteLook.shapes;
    }
    // tslint:disable-next-line:triple-equals
    if (x == 1) {
      return NoteLook.rectangle;
    }
    // tslint:disable-next-line:triple-equals
    if (x == 2) {
      return NoteLook.list;
    }
  }

  private _AddToTrash(note: Note) {
    const bucketLabel = NoteType.trash;
    const obs = this.BucketLabelObservableMap.get(bucketLabel);
    let bucket = obs.getValue();
    bucket.push({
      id: bucket.length > 0 ? +bucket[0].id + 1 : 1,
      title: note.title,
      content: note.content,
      isDeleted: note.isDeleted,
      isNew: false,
      label: note.label,
      time: undefined,
    });
    bucket = bucket.sort((a, b) => {
      return b.id - a.id;
    });
    localStorage.setItem(bucketLabel, JSON.stringify(bucket));
    obs.next(JSON.parse(localStorage.getItem(bucketLabel)) || []);
    this.BucketLabelObservableMap.set(bucketLabel, obs);
  }
}
