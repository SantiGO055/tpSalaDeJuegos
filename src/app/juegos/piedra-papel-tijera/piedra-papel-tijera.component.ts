import { MensajesService } from './../../services/mensajes.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { GameppService } from './../../services/gamepp.service';
import { Component, OnInit } from '@angular/core';
import { Estadisticappt } from 'src/app/clases/ppt/estadisticappt';
import { User } from 'src/app/clases/user';

@Component({
  selector: 'app-piedra-papel-tijera',
  templateUrl: './piedra-papel-tijera.component.html',
  styleUrls: ['./piedra-papel-tijera.component.css']
})
export class PiedraPapelTijeraComponent implements OnInit {
  result: string = '';
  pointsUser = 0;
  pointsComp =  0;
  choiceCompChar='';
  choiceComp!:string;
  estadistica: Estadisticappt;
  auxUser: User = new User();
  constructor(private playGame: GameppService,
    private router: Router,
    private authSvc: AuthService,
    private firestoreSvc: MensajesService) { }

  ngOnInit(): void {
    this.result = 'Esperando jugada...';
  }
  play(choice: string): void {
    const result = this.playGame.game(choice);
    this.choiceCompChar = result.compChoice;
    this.result = result.message;
    this.pointsUser += result.userAdd;
    this.pointsComp += result.compAdd;
  }
  obtenerJugadaComp(){
    if(this.choiceCompChar === 's'){
      return this.choiceComp = "Tijera";
    }
    else if(this.choiceCompChar === 'p'){
      return this.choiceComp = "Papel";
    }
    else if(this.choiceCompChar === 'r'){
      return this.choiceComp = "Piedra";
    }
    return this.choiceComp;
  }
  guardar(salir : boolean){
    // console.log(this.result);



    this.authSvc.obtenerUsuarioLogueado().subscribe(user=>{
      
      // <string>user?.displayName;
      // jugador1.usuario = JSON.parse( localStorage.getItem('usuarioLogueado'));
      
      // jugador1.usuario = JSON.parse(JSON.stringify(usuarioAux));
      // jugador1.usuario.email = usuarioAux.email.slice();
      // jugador1.usuario.uid = usuarioAux.uid.slice();
      // jugador1.usuario.username = usuarioAux.username.slice();
      // jugador1.usuario.uid = usuarioAux.uid;
      // jugador1.usuario.username = usuarioAux.username;
      // jugador1.usuario =localStorage.getItem()
      this.estadistica = new Estadisticappt();
      this.estadistica.usuario = new User();
      
      this.estadistica.usuario.email = user.email;
      this.estadistica.usuario.uid = user.uid;
      this.estadistica.usuario.username = user.displayName;
      this.estadistica.fecha = this.estadistica.usuario.obtenerFechaHora();
      this.estadistica.puntComp = this.pointsComp;
      this.estadistica.puntUsuario = this.pointsUser;
      // console.log(this.estadistica);
      
      this.firestoreSvc.addPPT(this.estadistica);
    });


    if(salir){
      this.router.navigate(["home"])
      
    }
  }


}
