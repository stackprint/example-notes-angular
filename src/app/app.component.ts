import { Component } from '@angular/core';
import { NoteService, Note } from 'stackprint-api';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  notes$: Observable<Note[]>

  constructor(private noteService: NoteService) {
  }

  ngOnInit() {
    this.notes$ = this.noteService.notesGet()
  }

}
