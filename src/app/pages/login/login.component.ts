import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormControlName } from '@angular/forms';
import { AuthService } from '../../core/services/auth/auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private readonly formBuilder=inject(FormBuilder);
  private readonly authService=inject(AuthService);
  private readonly router=inject(Router);
 
 msgSuccess:string='';
 msgError:string='';
 isLoad:boolean=false;
 
  loginForm:FormGroup=this.formBuilder.group({
   
   email:[null,[Validators.required,Validators.email]],
   password:[null,[Validators.required,Validators.pattern(/^[A-Z]\w{6,}$/)]],
  });
 
 
  loginFormSubmit(){
   if(this.loginForm.valid){
     this.isLoad=true;
 
     this.authService.sendLoginForm(this.loginForm.value).subscribe({
       next:(res)=>{
         console.log(res);
        
         if(res.msg="done"){

          localStorage.setItem('userToken',res.token);
          this.authService.saveToken();

          
           this.isLoad=false;
           this.msgSuccess=res.msg;

           
           setTimeout(() => {
             this.msgSuccess='';
           }, 400);
            this.loginForm.reset();
            setTimeout(() => {
             this.router.navigate(['/home']);
            }, 500);
         }
       },
       error:(err:HttpErrorResponse)=>{
         console.log(err);
         this.isLoad=false;
         setTimeout(() => {
           this.msgError='';
         }, 800);
         this.msgError=err.error.msg;
       }
     });
 
   }else{
     
       this.loginForm.markAllAsTouched();
   
   }
  }
 
  
}
