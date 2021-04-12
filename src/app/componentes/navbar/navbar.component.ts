import { LoggedComponent } from './../logged/logged.component';
import { User } from '../../clases/user';
import { AuthService } from '../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  public toggleNavbar = true;
  ocultarBotonLogout: boolean = true;
  ocultarLogin: boolean = true;
  ocultarRegistro: boolean = false;

  constructor(private authSvc: AuthService) {
    
   }
  usuario : User = new User();
  ngOnInit(): void {
    this.ocultarLogin = this.authSvc.ChequearLogueado();
  }

  // async desloguear(){
  //   this.authSvc.afAuth.authState.subscribe(res=>{
  //     if(res && res.uid){
  //       this.authSvc.afAuth.signOut();
  //       this.ocultarBotonLogout = false;
  //       console.log(res.email);
  //     }
  //     else{
  //       this.ocultarBotonLogout = true;
  //     }
  //   })
  // }
}
