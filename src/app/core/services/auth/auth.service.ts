import { jwtDecode } from "jwt-decode";
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient:HttpClient) { }
   private router=inject(Router);

  sendRegisterForm(data:object):Observable<any>{
    return this.httpClient.post('https://note-sigma-black.vercel.app/api/v1/users/signUp',data);

  }
  sendLoginForm(data:object):Observable<any>{
    return this.httpClient.post('https://note-sigma-black.vercel.app/api/v1/users/signIn',data);

  }
   userData:any=null
  saveToken(){
    if(localStorage.getItem('userToken')!==null){
      this.userData=jwtDecode(localStorage.getItem('userToken')!);
       console.log(this.userData);
  }
}

signOut(){
  localStorage.removeItem('userToken');
  this.userData=null;
  this.router.navigate(['/login']);
}

}
