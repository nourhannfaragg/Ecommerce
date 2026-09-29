import { Component, inject } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms'
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  private readonly authService = inject(AuthService);
  private readonly router = inject(Router)
  msgError:string="";
  isLoading:boolean = false;
  flag:boolean=true;
  subscription:Subscription = new Subscription() ;

  registerForm:FormGroup = new FormGroup({
    name: new FormControl( null , [Validators.required , Validators.minLength(3) , Validators.maxLength(20)]),
    email: new FormControl( null , [Validators.required , Validators.email]),
    password : new FormControl( null , [Validators.required , Validators.pattern(/^\w{6,}$/)]),
    rePassword:new FormControl( null , [Validators.required ,Validators.pattern(/^\w{6,}$/) ]),
    phone : new FormControl( null , [Validators.required , Validators.pattern(/^01[0125][0-9]{8}$/)])
  } , {validators:this.confirmPassword})


   confirmPassword(group:AbstractControl){
      return  group.get('password')?.value === group.get('rePassword')?.value ? null : {mismatch:true}
   }
// al project fen ?!
  submitForm():void{
    console.log(this.registerForm.value)
    if(this.registerForm.valid){
      //logic apis
       this.subscription.unsubscribe();

        this.isLoading= true;
        

    this.subscription = this.authService.registerForm(this.registerForm.value).subscribe({// da shayel el object ely mehtag ab3ato  backend
      next:(res)=>{
        console.log(res)
        this.isLoading = false;
        this.msgError = "";

        if(res.message === "success"){
                                           // goo to login
           this.router.navigate(['/login'])
          
        }

      },
      error: (err) => {
  console.log("Full error object:", err);

  if (err.error?.errors?.msg) {
    this.msgError = err.error.errors.msg;   // زي: "must be at least 3 chars"
  } 
  else if (err.error?.message) {
    this.msgError = err.error.message;      // زي: "Account Already Exists"
  } 
  else {
    this.msgError = "Something went wrong, please try again.";
  }

  this.isLoading = false;
}
    }) 
  }

    else{
      this.registerForm.markAllAsTouched();
    }
    
    
  }
}
// fen al body al btb3teh m3 al api ?!
//anhy api