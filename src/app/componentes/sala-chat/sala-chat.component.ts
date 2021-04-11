import { AuthService } from './../../services/auth.service';
import { Mensaje } from './../../clases/mensaje';
import { MensajesRealtimeService } from './../../services/mensajes-realtime.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/clases/user';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-sala-chat',
  templateUrl: './sala-chat.component.html',
  styleUrls: ['./sala-chat.component.css']
})
export class SalaChatComponent implements OnInit {
  mensajeObj: Mensaje = new Mensaje();
  user: User = new User();
  mensaje: string = '';
  listadoMensajes?: any[];
  currentIndex = -1;
  title = '';
  isOwnMessage!: boolean;
  ownEmail!: string;
  @ViewChild('scroller') private divMensaje!: ElementRef;
  items:Array<string>=[];
  timeStamp: Date = new Date();



  constructor(private mensajeService: MensajesRealtimeService,
    private authSvc: AuthService) {
      
     }
     

  ngOnInit(): void {
    this.cargarMensajes();
    this.authSvc.obtenerUsuarioLogueado().subscribe(user=>{
      this.user.email= <string>user?.email;
      this.user.uid= <string>user?.uid;
      this.user.username= <string>user?.displayName;
      this.ownEmail = this.user.email;
      this.isOwnMessage = this.ownEmail === this.user.email;
    });
    
  }

  scrollToBottom(): void {
    this.divMensaje.nativeElement.scrollTop
    = this.divMensaje.nativeElement.scrollHeight;
  }
  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  cargarMensajes(): void {
    this.mensajeService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val()})
        )
      )
    ).subscribe(data => {
      this.listadoMensajes = data;
    });
  }
  obtenerFechaHora(){
    var segString: string = '';
    var minString: string = '';
    var fecha : Date = new Date();
    if(fecha.getSeconds().toString().length >= 2){
        segString = fecha.getSeconds().toString();
        // console.log(this.segString);
      }
    else{
      segString = "0"+ fecha.getSeconds().toString();
    }
    if(fecha.getMinutes().toString().length >=2){
      minString = fecha.getSeconds().toString();
    }
    else{
      minString = "0"+fecha.getMinutes().toString();
    }
    var fechaCompleta = fecha.getDate() + "/" + fecha.getMonth()+ "/" + fecha.getFullYear();

    return fechaCompleta + "-" + fecha.getHours() + ":" + minString + ":" +  segString;
  }

  enviarMensaje(){
    if(this.user){
      // this.mostrarMensajeLogueado();
      this.mensajeObj.mensaje = this.mensaje;
      

      this.mensajeObj.usuario = this.user;
      this.mensajeObj.hora = this.obtenerFechaHora();
      console.log(this.obtenerFechaHora());
      
      
      this.mensajeService.enviarMensaje(this.mensajeObj);
      console.log(this.listadoMensajes);
      console.log(this.isOwnMessage);
    }
    else{
      console.log("usuario deslogueado");
    }
  }
}
