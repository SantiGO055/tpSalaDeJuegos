import { Mensaje } from './../../clases/mensaje';
import { Component, OnInit } from '@angular/core';
import { User } from '../../clases/user';
import { AuthService } from '../../services/auth.service';
import { MensajesService } from '../../services/mensajes.service';
import { Observable } from 'rxjs';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.component.html',
  styleUrls: ['./mensajes.component.css'],
  providers: [DatePipe]
})
export class MensajesComponent implements OnInit {

  mensaje:string = '';
  editMensaje: string = '';
  mensajeObtenido : Mensaje[];
  user: User = new User();
  aux: User = new User();
  ocultoDiv: boolean = true;
  mostrarMensajeDeLogueado: boolean = false;
  mensajeObj = {} as Mensaje;
  fecha: Date = new Date();
  
  
  constructor(private authSvc: AuthService, private mensajeService: MensajesService, private datePipe: DatePipe) {
    this.mensajeObtenido = [];

    
    //  = this.datePipe.transform(this.fechaHora, 'yyyy-MM-dd');
    // if(this.editingMensaje != null){
    //   this.editingMensaje = {id: '',mensaje: '',usuario: this.user};
    // }

   }

  ngOnInit(): void {
    this.mensajeService.getAll().subscribe((mensajes : Mensaje[])=>{
      this.mensajeObtenido =  mensajes;
      // console.log(this.mensajeObtenido);
    });
    
  }
  // obtenerFechaHora(){
  //   var segString: string = '';
    

  //   if(this.fecha.getSeconds().toString().length >= 2){
  //       segString = this.fecha.getSeconds().toString();
  //       // console.log(this.segString);
  //     }
  //   else{
  //   segString = "0"+ this.fecha.getSeconds().toString();
  //   }
  //   var fechaCompleta = this.fecha.getDate() + "/" + this.fecha.getMonth()+ "/" + this.fecha.getFullYear();

  //   return fechaCompleta + "-" + this.fecha.getHours() + ":" + this.fecha.getMinutes()+ ":" +  segString;
  // }

   enviarMensaje(){
    this.user = this.authSvc.isLogged;
    if(this.user){
      this.mostrarMensajeLogueado();
      this.mensajeObj.mensaje = this.mensaje;
      // console.log(this.user.email);

      this.aux.email = this.user.email;
      this.aux.username = this.user.username;
      this.aux.uid = this.user.uid;
      this.mensajeObj.usuario = this.aux;
      this.mensajeObj.hora = this.user.obtenerFechaHora();
      
      
      this.mensajeService.add(this.mensajeObj);
    }
    else{
      // console.log("usuario deslogueado");
    }
  }
  
  mostrarMensajeLogueado(){
    this.mensajeObtenido.map((value)=>{
      if(value.usuario.uid == this.user.uid){
        this.mostrarMensajeDeLogueado = true;
      }
      else{
        this.mostrarMensajeDeLogueado = false;

      }
    });
  }
  
  deleteMensaje(event:any,mensaje:Mensaje){
    // console.log(event);
    this.mensajeService.deleteMensaje(mensaje);
  }
  editarMensaje(){
    //llamo al servicio mensaje para editar en la bd
    // console.log(this.mensajeObj);
    
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
