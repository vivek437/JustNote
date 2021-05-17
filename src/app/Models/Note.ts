import { NoteType } from './NoteType';
export class Note {
  id: number;
  title: string;
  content: string;
  isDeleted = false;
  time: Date;
  isNew: boolean;
  label: string;
}
