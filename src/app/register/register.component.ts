import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { User } from './../clases/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  flag: boolean = false;
  email: string ='';
  password: string = '';
  user: User = new User();
  
  constructor(private authSvc : AuthService, private router: Router) { }
  ngOnInit(): void {
  }

  prueba(){
    console.log(this.email);
    console.log(this.password);
  }
  async register(){
    this.user.email = this.email;
    this.user.password = this.password;
    const user = await this.authSvc.register(this.user);
    if(user.message == null){
      // this.alertaLogueo('Se creo el usuario con email: ' + this.user.email + ' correctamente', 'Registro exitoso');
      console.log("Successfully created user!");
      this.router.navigateByUrl('/home');
    }
    else{
      console.log(user.code);
      if(user.code == 'auth/invalid-email'){
        window.alert("Ingrese un email valido por favor");
      }
      if(user.code == 'auth/weak-password'){
        window.alert("La contraseña debe ser mayor a 6 caracteres.");
      }
      if(user.code == 'auth/wrong-password'){
        window.alert("Contraseña incorrecta, reingrese");
      }
      if(user.code == 'auth/email-already-in-use'){
        window.alert("Email en uso");
      }
      
    }
  }
}
