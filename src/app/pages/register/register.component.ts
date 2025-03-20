import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormControlName } from '@angular/forms';
import { AuthService } from '../../core/services/auth/auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
 private readonly formBuilder=inject(FormBuilder);
 private readonly authService=inject(AuthService);
 private readonly router=inject(Router);

msgSuccess:string='';
msgError:string='';
isLoad:boolean=false;

 register:FormGroup=this.formBuilder.group({
  name:[null,[Validators.required,Validators.minLength(3),Validators.maxLength(20)]],
  email:[null,[Validators.required,Validators.email]],
  password:[null,[Validators.required,Validators.pattern(/^[A-Z]\w{6,}$/)]],
  age:[null,[Validators.required,Validators.min(18),Validators.max(99)]],
  phone:[null,[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]],
 });


 registerSubmit(){
  if(this.register.valid){
    this.isLoad=true;

    this.authService.sendRegisterForm(this.register.value).subscribe({
      next:(res)=>{
        console.log(res);
        if(res.msg="done"){
          this.isLoad=false;
          this.msgSuccess=res.msg;
          setTimeout(() => {
            this.msgSuccess='';
          }, 400);
           this.register.reset();
           setTimeout(() => {
            this.router.navigate(['/login']);
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
    
      this.register.markAllAsTouched();
  
  }
 }

 

}
