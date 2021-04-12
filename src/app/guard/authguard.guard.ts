import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthguardGuard implements CanActivate {
  constructor(
    private auth : AuthService,
    private router: Router
  ){

  }
  canActivate(next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
        if(this.auth.isLogged){
          
          
          return true;
        }
        else{
          console.log('Acces Denied');
          this.router.navigate(['/ingreso/login']);
          return false;
        }
        // this.auth.afAuth.onAuthStateChanged((user)=>{
      // if (this.auth.isLogged) {
      //   this.router.navigate(['/home']);
      //  return true;
      // }
      // else{
      //   console.log('Acces Denied');
      //   this.router.navigate(['login']);
      //   return false;
      // }
  }
  
}
