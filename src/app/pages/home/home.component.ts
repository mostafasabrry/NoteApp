import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NotesService } from '../../core/services/notes/notes.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Inotes } from '../../shared/interfaces/inotes';
import { title } from 'process';

@Component({
  selector: 'app-home',
  imports: [ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  private readonly formBuilder=inject(FormBuilder);
  private readonly notesService=inject(NotesService);
  private readonly router=inject(Router);
  private readonly toastrService=inject(ToastrService);

  dataNotes:WritableSignal<Inotes[]>=signal([])

  ngOnInit(): void {
    this.getUsersNotes();
  }
  
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
  
  noteForm:FormGroup=this.formBuilder.group({
   
    title:[null,[Validators.required]],
    content:[null,[Validators.required]],
   });

  updateNoteForm:FormGroup=this.formBuilder.group({
    title:[null,[Validators.required]],
    content:[null,[Validators.required]],
   });


   
   submitNote(){
    if(this.noteForm.valid){
      this.notesService.addNotes(this.noteForm.value).subscribe({
        next:(res)=>{
          
          this.toastrService.success(res.msg,"Notify");
          this.getUsersNotes();
          this.noteForm.reset();
        },
        error:(err)=>{
          console.log(err);
        }
      }) }
      else{
        this.noteForm.markAllAsTouched();
      }
}


noteId!:string;
setDataInUpdate(Data:any,id:string){
  this.noteId=id;

  this.updateNoteForm.patchValue({
    title:Data.title,
    content:Data.content
  })

}

submitUpdateNote(){
  this.notesService.updateNotes(this.noteId,this.updateNoteForm.value).subscribe({
    next:(res)=>{
      this.toastrService.success(res.msg,"Notify");
      this.getUsersNotes();
    },
    error(err) {
      console.log(err);
    },
  })

}



deleteNote(id:string){
  this.notesService.deleteNotes(id).subscribe({
    next:(res)=>{
      this.toastrService.error("Note Deleted","Notify");
     
      this.getUsersNotes();
      
    },
    error(err) {
      
      console.log(err);
      
     

    },
  })
}





}



