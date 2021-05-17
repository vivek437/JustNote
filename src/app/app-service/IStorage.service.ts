import { Observable, BehaviorSubject } from 'rxjs';
import { Note } from '../Models/Note';
import { NoteLook } from '../Models/NoteLook';

export abstract class IStorageService {
  abstract GetNoteLook(): number;

  abstract GetDefaultBuckets(): string[];
  abstract GetAllCustomBuckets(): Observable<string[]>;
  abstract GetNotesByBucketLabel(bucketLabel: string): Observable<Note[]>;

  abstract CreateCustomBucket(newLabel: string);
  abstract UpdateBucket(list: Note[]);
  abstract DeleteBucket(bucketLabel: string);

  abstract CreateNote(note: Note);
  abstract UpdateNote(note: Note);
  abstract DeleteNote(note: Note, moveToTrash?: boolean);

  abstract DeleteFromTrash(note: Note);

  abstract MoveNote(note: Note, moveToLabel: string);
  abstract RecycleNote(note: Note);

  abstract ChangeLook(): NoteLook;
}
