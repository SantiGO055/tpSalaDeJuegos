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
  mostrarChat:boolean = false;

  @ViewChild('scroller') private divMensaje!: ElementRef;
  items:Array<string>=[];



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
    console.log("afterviewchecked");
    this.scrollToBottom();
  }
  // ngAfterViewInit() {
  //   console.log("afterinit");
  //   setTimeout(() => {
  //     this.scrollToBottom();
  //     console.log(this.divMensaje.nativeElement.innerText);
  //   }, 3000);
  // }

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
  // enviarConEnter(e:any){
  //   console.log(e);
  //   if (e.keyCode === 13) {
  //     e.preventDefault();
  //     this.enviarMensaje();
  //   }
  // }
  enviarMensaje(){
    
    if(this.user){
      if(this.mensaje != ''){
        this.mensajeObj.mensaje = this.mensaje;
        this.mensajeObj.usuario = this.user;
        this.mensajeObj.hora = this.user.obtenerFechaHora();
        this.mensajeService.enviarMensaje(this.mensajeObj);
        console.log(this.listadoMensajes);
        // console.log(this.isOwnMessage);
      }
    }
    else{
      console.log("usuario deslogueado");
    }
    this.mensaje = '';
  }
  mostrarChatFunc(){
    this.mostrarChat = !this.mostrarChat;
  }

}
