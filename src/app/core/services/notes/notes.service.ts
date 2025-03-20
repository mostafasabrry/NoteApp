import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor(private httpClient:HttpClient) { }

 
  addNotes(data:object):Observable<any>{
    return this.httpClient.post(`https://note-sigma-black.vercel.app/api/v1/notes`,data);
  }

  
  getUsersNotes():Observable<any>{
    return this.httpClient.get(`https://note-sigma-black.vercel.app/api/v1/notes`);
  }
  updateNotes(id:string,data:object):Observable<any>{
    return this.httpClient.put(`https://note-sigma-black.vercel.app/api/v1/notes/${id}`,data);
  }
  deleteNotes(id:string):Observable<any>{
    return this.httpClient.delete(`https://note-sigma-black.vercel.app/api/v1/notes/${id}`);
  }

}
