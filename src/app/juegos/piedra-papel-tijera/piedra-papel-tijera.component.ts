import { GameppService } from './../../services/gamepp.service';
import { Component, OnInit } from '@angular/core';

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
  constructor(private playGame: GameppService) { }

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
    
  }


}
