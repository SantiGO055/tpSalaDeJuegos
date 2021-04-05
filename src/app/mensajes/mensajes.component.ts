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
  mensajeObtenido : Mensaje[];
  user: User = new User();
  aux: User = new User();
  
  mensajeObj = {} as Mensaje;

  constructor(private authSvc: AuthService, private mensajeService: MensajesService) {
    this.mensajeObtenido = [];
   }

  ngOnInit(): void {
    this.mensajeService.getAll().subscribe((mensajes : Mensaje[])=>{
      console.log(mensajes);
      this.mensajeObtenido =  mensajes;
    });
  }

   enviarMensaje(){
    this.user = this.authSvc.isLogged;

    console.log(this.user);

    if(this.user){
      this.mensajeObj.mensaje = this.mensaje;
      console.log(this.user.email);

      this.aux.email = this.user.email;
      this.aux.username = this.user.username;
      this.aux.uid = this.user.uid;

      this.mensajeObj.usuario = this.aux;
      
      // this.mensajeObj.usuario.email = this.user.email;

      // this.mensajeObj.usuario.username = this.user.username;
      // this.mensajeObj.usuario.uid = this.user.uid;
      console.log(this.mensajeObj);
      // console.log(this.mensajeObj.usuario);
      
      this.mensajeService.add(this.mensajeObj);
    }
    else{
      console.log("usuario deslogueado");
    }
  }
  obtenerMensaje(){
    
    
  }
  deleteMensaje(event:any,mensaje:Mensaje){
    console.log(event);
    this.mensajeService.deleteMensaje(mensaje);
  }
  
}
