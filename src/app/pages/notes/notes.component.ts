import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { NotesService } from '../../core/services/notes/notes.service';
import { Inotes } from '../../shared/interfaces/inotes';



@Component({
  selector: 'app-notes',
  imports: [],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.scss'
})
export class NotesComponent implements OnInit {
  private readonly notesService=inject(NotesService)

  ngOnInit(): void {
    this.getUsersNotes();
  }
  
  dataNotes:WritableSignal<Inotes[]>=signal([])
  getUsersNotes(){
    this.notesService.getUsersNotes().subscribe({
      next:(res)=>{
        
        this.dataNotes.set(res.notes);
        
      },
      error:(err)=>{
        console.log(err);
        if(err.error.msg=='not notes found'){
          this.dataNotes.set([]);
        }
      }
    })
  }
}
