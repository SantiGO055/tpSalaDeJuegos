import { Component, OnInit } from '@angular/core';
import { User } from '../clases/user';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public toggleNavbar = true;
  ocultarBotonLogout: boolean = true;
  ocultarLogin: boolean = true;
  ocultarRegistro: boolean = false;
  usuario : User = new User();

  constructor(private authSvc: AuthService) {
    
   }
  ngOnInit(): void {
    if(this.usuario.email = localStorage.getItem('emailLogueadoLocalStorage')){
      this.ocultarLogin = false;
    }
  }

}
