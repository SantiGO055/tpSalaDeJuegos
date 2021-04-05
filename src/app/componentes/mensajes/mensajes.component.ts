import { Mensaje } from './../../clases/mensaje';
import { Component, OnInit } from '@angular/core';
import { User } from '../../clases/user';
import { AuthService } from '../../services/auth.service';
import { MensajesService } from '../../services/mensajes.service';
@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.component.html',
  styleUrls: ['./mensajes.component.css']
})
export class MensajesComponent implements OnInit {

  mensaje:string = '';
  editMensaje: string = '';
  mensajeObtenido : Mensaje[];
  user: User = new User();
  aux: User = new User();
  ocultoDiv: boolean = true;
  mensajeObj = {} as Mensaje;
  // editingMensaje: Mensaje ;
  constructor(private authSvc: AuthService, private mensajeService: MensajesService) {
    this.mensajeObtenido = [];
    // if(this.editingMensaje != null){
    //   this.editingMensaje = {id: '',mensaje: '',usuario: this.user};
    // }

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
      // console.log(this.user.email);

      this.aux.email = this.user.email;
      this.aux.username = this.user.username;
      this.aux.uid = this.user.uid;
      this.mensajeObj.usuario = this.aux;
      // console.log(this.mensajeObj);
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
  editarMensaje(){
    //llamo al servicio mensaje para editar en la bd
    console.log(this.mensajeObj);
    
    this.mensajeObj.mensaje = this.editMensaje;
    this.mensajeService.updateMensaje(this.mensajeObj)
    this.ocultoDiv = !this.ocultoDiv;
  }
  /**Muestro el input y boton para editar el mensaje, asigno el texto del mensaje del que le di el boton editar */
  mostrarEditado(mensaje: Mensaje){

    this.mensajeObj = mensaje;
    this.editMensaje = mensaje.mensaje;
    this.ocultoDiv = !this.ocultoDiv;
    
  }
  
}
