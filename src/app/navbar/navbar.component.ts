import { User } from './../clases/user';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  flagLogueado: boolean = true;
  usuarioLogueado: any;
  ocultarLogin: boolean = false;
  ocultarRegistro: boolean = false;
  constructor(private authSvc: AuthService) { }

  ngOnInit(): void {
    
  }
}
