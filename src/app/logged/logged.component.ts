import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-logged',
  templateUrl: './logged.component.html',
  styleUrls: ['./logged.component.css']
})
export class LoggedComponent implements OnInit {
  usuarioLogueado: any;
  ocultarLogin: boolean = false;
  ocultarRegistro: boolean = false;
  ocultarMensaje : boolean = true;
  constructor(private authSvc : AuthService) { }

  ngOnInit(): void {
    if(this.authSvc.isLogged){
      this.authSvc.afAuth.authState.subscribe(res=>{
        if(res && res.uid){
          this.usuarioLogueado.email = res.email;
          this.ocultarLogin = true;
          this.ocultarRegistro = true;
          this.ocultarMensaje = false;
        }
      });
    }
    else{
      this.ocultarLogin = false;
      this.ocultarRegistro = false;
      this.ocultarMensaje = true;
    }
  }

}
