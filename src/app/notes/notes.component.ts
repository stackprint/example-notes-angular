import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import { Note, NoteService, NoteParams } from 'gen/typescript-angular-client';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  @ViewChild('noteInput') noteInput: ElementRef;

  notes$: Observable<Note[]>

  constructor(private noteService: NoteService) { }

  ngOnInit(): void {
    this.loadNotes()
  }

  private loadNotes() {
    this.notes$ = this.noteService.listNotes()
  }

  createNote() {
    const params: NoteParams = {
      text: this.noteInput.nativeElement.value
    }
    this.noteService.createNote(params)
      .subscribe(() => this.loadNotes())
  }

  deleteNote(id: string) {
    this.noteService.deleteNote(id)
      .subscribe(() => this.loadNotes())
  }

}
