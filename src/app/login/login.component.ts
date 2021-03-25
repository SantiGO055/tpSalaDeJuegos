import { AuthService } from './../services/auth.service';
import { User } from './../clases/user';
import { Router } from '@angular/router';
import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  errorMessage = '';
  email: string ='';
  password: string = '';
  emailRegister: string ='';
  passwordRegister: string = '';
  flag: boolean = true;
  
 constructor(private afAuth: AngularFireAuth,
   private router: Router,
   private fb: FormBuilder,
   private ngZone: NgZone,
   private authSvc: AuthService,
   private formBuilder: FormBuilder) { 

   }

   
  user: User = new User();

  
  ngOnInit(): void {
    
  }
  // if(this.router.routerState.snapshot.url == "/LoginComponent"){
  //   this.flag = !this.flag;
  // }
  async login(){
  
  console.log(this.email);
    
  this.user.email = this.email;
  this.user.password = this.password;
  try {
    const user = await this.authSvc.SignIn(this.user);
    // console.log(user);
    if (user.message == null ) {
      console.log("se logueo");
      this.router.navigateByUrl('/');
    }
    else{
      if(user.code == 'auth/invalid-email'){
        window.alert("Ingrese un email valido por favor");
      }
      if(user.code == 'auth/argument-error'){
        window.alert("Complete la contraseña por favor.");
      }
      if(user.code == 'auth/wrong-password'){
        window.alert("Contraseña incorrecta, reingrese");
      }
      console.log(user.message);
    }
    
  } catch (error) {
    
    console.log(error);
    // 
  }
    // }
  }
  register(){

  }
  

}
