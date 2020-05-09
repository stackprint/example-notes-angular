import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NoteService, Note, NoteParams } from 'stackprint-api';
import { Observable } from 'rxjs';

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
    this.notes$ = this.noteService.notesGet()
  }

  createNote() {
    const params: NoteParams = {
      text: this.noteInput.nativeElement.value
    }
    this.noteService.notesPost(params)
      .subscribe(() => this.loadNotes())
  }

  deleteNote(id: string) {
    this.noteService.notesIdDelete(id)
      .subscribe(() => this.loadNotes())
  }

}
