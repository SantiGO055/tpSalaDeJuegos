import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameppService {

  constructor() { }
  playStatus!: {
    message: string;
    userAdd: number;
    compAdd: number;
  };
  getComputerChoice(): string {
    const choices = ['r', 'p', 's'];
    const randomChoice = Math.floor(Math.random() * 3);
    return choices[randomChoice];
  }
 
  game(
    userChoice: string
  ): {
    message: string;
    userAdd: number;
    compAdd: number;
  } {
    
    
    const playUserComp = userChoice + this.getComputerChoice();
    console.log(`Jugada realizada: ${playUserComp}`);
    
    switch (playUserComp) {
      // Ganamos
      case 'rs':
      case 'sp':
      case 'pr':
        this.playStatus = {
          message: 'Ganas a la computadora',
          userAdd: 1,
          compAdd: 0,
        };
        break;
      // Gana la computadora
      case 'rp':
      case 'ps':
      case 'sr':
        this.playStatus = {
          message: 'Gana la computadora',
          userAdd: 0,
          compAdd: 1,
        };
        break;
      // Empatamos
      case 'rr':
      case 'pp':
      case 'ss':
        this.playStatus = {
          message: 'Habéis elegido la misma jugada y habéis empatado',
          userAdd: 0,
          compAdd: 0,
        };
        break;
    }
    return this.playStatus;
  }
}
