import { CookieService } from 'ngx-cookie-service';
import { Subscription } from 'rxjs';
import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

    private readonly authService = inject(AuthService);
    private readonly router = inject(Router)
    private readonly cookieService = inject(CookieService)


    msgError:string="";
    isLoading:boolean = false;
    subscription:Subscription = new Subscription();
    flag:boolean = true;

  loginForm !:FormGroup 

  ngOnInit():void{
    this.initForm();

  }

    initForm():void{
      this.loginForm = new FormGroup({
    email: new FormControl( null , [Validators.required , Validators.email]),
    password : new FormControl( null , [Validators.required , Validators.pattern(/^\w{6,}$/)]),
  })
    }



  submitForm():void{
    if(this.loginForm.valid){
      //logic apis
      this.subscription.unsubscribe();

        this.isLoading= true;

      this.subscription = this.authService.loginrForm(this.loginForm.value).subscribe({// da shayel el object ely mehtag aba3to to backend
      next:(res)=>{
        console.log(res);
        if(res.message === "success"){
       // goo to home

       this.cookieService.set('token'  , res.token)
       console.log(this.authService.decodeToken());

           this.router.navigate(['/home'])
          
        }

        this.isLoading = false;
      },
      error:(err)=>{
        this.msgError = err.error.message;
        this.isLoading = false;
      },
    }) 

    }
    
    
  }
}


