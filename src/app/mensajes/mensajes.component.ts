import { Component, OnInit } from '@angular/core';
import { User } from '../clases/user';
import { AuthService } from '../services/auth.service';
import { MensajesService } from '../services/mensajes.service';
import{ Mensaje } from './../clases/mensaje';
@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.component.html',
  styleUrls: ['./mensajes.component.css']
})
export class MensajesComponent implements OnInit {
  mensaje:string = '';
  mensajeObtenido : any;
  user: User = new User();
  constructor(private authSvc: AuthService, private mensajeService: MensajesService) {
    
   }

  ngOnInit(): void {
  }

  enviarMensaje(){
    this.user = this.authSvc.obtenerUsuarioLogueado();
    if(this.user){
      console.log(this.user);
      let mensaje: Mensaje = new Mensaje(this.mensaje,this.user);
      console.log(mensaje);
      console.log(this.mensajeService.create(mensaje));
    }
    else{
      console.log("usuario deslogueado");
    }
  }
  obtenerMensaje(){
    this.user = this.authSvc.obtenerUsuarioLogueado();
    console.log(this.user.email);
    this.mensajeObtenido = this.mensajeService.getMensajeFromEmail(this.user.email);
    console.log(this.mensajeObtenido);
  }
}
