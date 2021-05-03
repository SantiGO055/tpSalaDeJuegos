import { AuthService } from './../../services/auth.service';
import { Estadisticatateti } from '../../clases/tateti/estadisticatateti';


import { MensajesService } from './../../services/mensajes.service';
import Swal from'sweetalert2';
import { Bloque } from './../../clases/tateti/bloque';
import { Jugador } from './../../clases/tateti/jugador';
import { TatetiService } from './../../services/juegos/tateti/tateti.service';
import { Component, OnInit,TrackByFunction } from '@angular/core';
// import { MdSnackBar } from '@angular/material/';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { User } from 'src/app/clases/user';

@Component({
  selector: 'app-tateti',
  templateUrl: './tateti.component.html',
  styleUrls: ['./tateti.component.css']
})
export class TatetiComponent implements OnInit {
  lock = false;
  constructor(public gs: TatetiService, public snackBar: MatSnackBarModule, private firestoreSvc: MensajesService,private authSvc:AuthService) { }
  jugador1 = new Jugador();
  jugador2 = new Jugador();
  
  Toast = Swal.mixin({
    toast: true,
    position: 'bottom',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })
  
  
  ngOnInit(){
    
  }
  newGame() {
    this.gs.freeBlocksRemaining = 9;
    this.gs.initBlocks();
    this.lock = false;
    this.gs.turn = 0;


  }

  resetGame(event: { preventDefault: () => void; }) {
      location.reload();
      event.preventDefault();
  }
  obtenerFecha(){
    var currentdate = new Date(); 
    var datetime =    currentdate.getDate() + "/"
                    + (currentdate.getMonth()+1)  + "/" 
                    + currentdate.getFullYear() + " - "  
                    + currentdate.getHours() + ":"  
                    + currentdate.getMinutes() + ":" 
                    + currentdate.getSeconds();
    return datetime;
  }
  saveGame(){
    
    
    // var usuarioAux:User
    
    
    // this.authSvc.obtenerUsuarioLogueado().subscribe(user=>{
    //   console.log(user);
    //   jugador1.usuario.email = user.email;
    //   jugador1.usuario.uid = user.uid;
    //   jugador1.usuario.username = user.displayName;
    // });
    this.jugador1.usuario = new User();
    this.authSvc.obtenerUsuarioLogueado().subscribe(user=>{
      this.jugador1.usuario.email= <string>user?.email;
      this.jugador1.usuario.uid= <string>user?.uid;
      this.jugador1.usuario.username = localStorage.getItem('emailLogueadoLocalStorage');
      // <string>user?.displayName;
      this.jugador1.score = this.gs.players[0].score;
      this.jugador1.bot = false;
      this.jugador2.bot = true;
      this.jugador2.score = this.gs.players[1].score;
      // jugador1.usuario = JSON.parse( localStorage.getItem('usuarioLogueado'));
      
      // jugador1.usuario = JSON.parse(JSON.stringify(usuarioAux));
      // jugador1.usuario.email = usuarioAux.email.slice();
      // jugador1.usuario.uid = usuarioAux.uid.slice();
      // jugador1.usuario.username = usuarioAux.username.slice();
      // jugador1.usuario.uid = usuarioAux.uid;
      // jugador1.usuario.username = usuarioAux.username;
      // jugador1.usuario =localStorage.getItem()

      console.log(this.jugador1.usuario);
      var estadisticaJuego = new Estadisticatateti();
      estadisticaJuego.jugador = this.jugador1;
      estadisticaJuego.computadora = this.jugador2;
      estadisticaJuego.empate = this.gs.draw;
      estadisticaJuego.fecha = this.obtenerFecha();
      this.firestoreSvc.addTateti(estadisticaJuego);
    });

    // this.jugador1.usuario = this.authSvc.obtenerPruebaUsuario();
    

  }

  playerClick(i: number) {
      if( this.gs.blocks[i].free == false || this.lock == true ) { // If Block is already fill, don't Do anything
          return;
      }

      this.gs.freeBlocksRemaining -= 1; // Reduce no. of free blocks after each selection

      if( this.gs.freeBlocksRemaining <= 0 ) {

          this.gs.draw += 1;
          this.lock = true;

          //reemplazar por sweetalert
          this.Toast.fire({
            icon: 'warning',
            title: 'Empate'
          })
          // this.snackBar.open("Game:", "Draw", {
          //   duration: 4000,
          // });
          this.newGame();
          return;
      }


      this.gs.blocks[i].free = false;

      if( this.gs.turn == 0 ) { // Player1 Turn
          this.gs.blocks[i].setValue("tick");
      
      } else { // Bot Turn
          this.gs.blocks[i].setValue("cross");    
      }

      var complete = this.gs.blockSetComplete();

      if( complete == false ) {
          this.changeTurn();    
          return;
          
      } else {
          this.lock = true;
          this.gs.players[this.gs.turn].score += 1;
          //reemplazar por sweetalert
          if((this.gs.turn +1) == 2 ){
            this.Toast.fire({
              icon: 'error',
              title: 'Gana jugador '+ (this.gs.turn +1),
            })
          }
          else{
            this.Toast.fire({
              icon: 'success',
              title: 'Gana jugador '+ (this.gs.turn +1),
            })

          }
          // this.snackBar.open("Winner:", "Player "+ (this.gs.turn +1), {
          //   duration: 4000,
          // });

          this.newGame();
          return;
      }
      
  }


  botTurn() {

      if( this.gs.freeBlocksRemaining <= 0 ) {
          return;
      }

      var bot_selected = this.gs.figureBotMove()-1;
      
      if( this.gs.blocks[bot_selected].free == true ) {
          this.playerClick(bot_selected);    
      } else {
          this.botTurn();
          return;
      }

  }


  changeTurn() {
      var player = this.gs.changeTurn();

      if( player == 1 ) { // Bot Turn
          this.botTurn();
      
      }
  }

}
