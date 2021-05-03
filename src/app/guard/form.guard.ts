import { MensajesService } from './../services/mensajes.service';
import { Injectable } from '@angular/core';
import { CanActivate, CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormGuard implements CanActivate, CanDeactivate<unknown> {
  constructor(private encuestSvc: MensajesService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  canDeactivate(
    component: unknown,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkForm();
  }
  checkForm():boolean{
    if(this.encuestSvc.formCompleted){
      return true;
    }
    else{
      console.log("asdasd");
      return false;
    }
  }
  
}
