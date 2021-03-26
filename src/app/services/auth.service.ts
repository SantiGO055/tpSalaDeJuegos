import { Router } from '@angular/router';
import { User } from './../clases/user';
import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isLogged: any = false;

  constructor(public afAuth: AngularFireAuth,private router: Router) {
    afAuth.authState.subscribe(user => (this.isLogged = user));
   }

  //login

  async SignIn(user: User) {
    
    // console.log(user);
    try {
      return await this.afAuth.signInWithEmailAndPassword(user.email, user.password);
    } 
    catch(error){
      return error;
    }
  }
  async register(user: User) {
    try {
      return await this.afAuth.createUserWithEmailAndPassword(user.email,user.password);
    } catch (error) {
      console.log('Error on register user', error);
      return error;
    }
  }
}
