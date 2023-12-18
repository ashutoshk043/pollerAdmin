import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm:any = FormBuilder

  constructor(private router:Router, private toastr: ToastrService,private formbuilder:FormBuilder, private loginservice:LoginService, private cookieService: CookieService){

  }


  ngOnInit(){
    this.loginDetails()

  }


  loginDetails(){
   this.loginForm = this.formbuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password:['', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&#`*%^_+=])[A-Za-z\d@$!%*?&#`*%^_+=]{8,}$/)
      ]]
    })
  }
  login() {
    const data = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };
  
    this.loginservice.login(data).subscribe({
      next: (res: any) => {
        if (res.status) {
          this.cookieService.set('auth', res.token, {
            expires: new Date(new Date().getTime() + 4 * 60 * 60 * 1000),
          });
          // Cookie will expire in 4 hours (as per your code)
  
          this.toastr.success('Login Success');
          this.router.navigate(['summary']);
        } else {
          // Handle login failure, show an error message, etc.
          this.toastr.error('Login Failed');
        }
      },
      error: (error) => {
        // Handle API request error here
        console.error('Login Error:', error);
  
        // You can also display an error message to the user
        this.toastr.error('An error occurred during login. Please try again.');
      },
    });
  }
  
  



}
