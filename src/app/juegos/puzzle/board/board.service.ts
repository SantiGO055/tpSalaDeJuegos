import { Estadisticapuzzle } from './../../../clases/puzzle/estadisticapuzzle';
import { User } from './../../../clases/user';
import { AuthService } from './../../../services/auth.service';
import { MensajesService } from './../../../services/mensajes.service';

import { Injectable } from '@angular/core';
import { Observable, Subscription, timer } from 'rxjs';
import {
  DIRECTION_UP,
  DIRECTION_DOWN,
  DIRECTION_LEFT,
  DIRECTION_RIGHT,
} from '../defs';

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  public content: any[] = [];
  private readonly completed: number[] = [];
  
  private started = false;
  private initialContent: any[] = [];
  finished = false;
  user:User;
  estadisticaPuzzle: Estadisticapuzzle;
  elapsedSeconds = 0;

  private timerSrc: Observable<number> = null;
  private timerSub: Subscription = null;

  movesCount = 0;
  private movesStack: string[] = [];

  constructor(
    private estadisticaPuzzleSvc: MensajesService,
    private authSvc: AuthService
  ) {
    // this.user = new User();
    this.completed = [];
    for (let i = 1; i <= 15; i++) {
      this.completed.push(i);
    }
    this.completed.push(null);
  }
  ngOnInit(){
    // this.authSvc.obtenerUsuarioLogueado().subscribe(user=>{
    //   this.user.email= <string>user?.email;
    //   this.user.uid= <string>user?.uid;
    //   this.user.username = localStorage.getItem('emailLogueadoLocalStorage');
      
    //   // <string>user?.displayName;
    // });
  }

  initGame() {
    this.started = false;
    this.finished = false;
    this.elapsedSeconds = null;
    this.movesCount = 0;
    this.movesStack = [];
    this.setCompleted();
  }

  startGame(initial: number[] = null) {
    this.started = true;
    this.finished = false; //TODO CAMBIE ESTO
    this.elapsedSeconds = 0;
    this.movesCount = 0;



    if (initial) {
      // we can cheat if we want
      this.content = initial.slice();
    } else {
      this.content = this.shuffle(this.completed);
    }
    if (this.timerSub) {
      this.timerSub.unsubscribe();
    }

    this.initialContent = this.content.slice();

    this.timerSrc = timer(1000, 1000);
    this.timerSub = this.timerSrc.subscribe(() => {
      this.elapsedSeconds++;
    });
  }

  setCompleted() {
    this.content = this.completed.slice();
  }

  isInProgress() {
    return this.started && !this.finished;
  }

  private shuffle(arr: number[]) {
    const result = arr.slice();
    return result.sort(() => Math.random() - 0.5);
  }

  private getNullIndex() {
    return this.content.findIndex(i => i === null);
  }

  private moveNullToIndex(sourceIndex: number, nullIndex: number) {
    const sourceValue = this.content[sourceIndex];
    this.content[sourceIndex] = null;
    this.content[nullIndex] = sourceValue;
  }

  subirEstadistica(){
    this.authSvc.obtenerUsuarioLogueado().subscribe(user=>{
      this.user = new User();
      this.user.email = user.email;
      this.user.uid = user.uid;
      this.user.username = user.displayName;


      this.estadisticaPuzzle = new Estadisticapuzzle();
      this.estadisticaPuzzle.usuario = this.user;
      this.estadisticaPuzzle.fecha = this.user.obtenerFechaHora();
      this.estadisticaPuzzle.movimientos = this.movesCount;
      this.estadisticaPuzzle.tiempoSegundos = this.elapsedSeconds;
      console.log(this.estadisticaPuzzle);
      // this.jugador1.usuario.email= <string>user?.email;
      // this.jugador1.usuario.uid= <string>user?.uid;
      // this.jugador1.usuario.username = localStorage.getItem('emailLogueadoLocalStorage');

      this.estadisticaPuzzleSvc.addEstadisticaPuzzle(this.estadisticaPuzzle); //TODO terminar esto
    });
  }
  isCompleted(abandono: boolean) {
    //JSON.stringify(this.content) === JSON.stringify(this.completed) poner esto dentro dle if
    if(JSON.stringify(this.content) === JSON.stringify(this.completed)){
      
      this.subirEstadistica();
      return true;
    }
    else{
      return false;
    }
  }

  move(direction: string) {
    let successful = false;

    if (this.isInProgress()) {
      switch (direction) {
        case 'up':
          successful = this.moveUp();
          break;
        case 'down':
          successful = this.moveDown();
          break;
        case 'left':
          successful = this.moveLeft();
          break;
        case 'right':
          successful = this.moveRight();
          break;
      }
    }

    if (successful) {
      this.movesStack.push(direction);
      this.movesCount++;
      this.finished =  this.isCompleted(false); //cambie esto, poner this.isCompleted();
     
    }
  }

  moveUp() {
    const nullIndex = this.getNullIndex();
    if (nullIndex <= 12) {
      const sourceIndex = nullIndex + 4;
      this.moveNullToIndex(sourceIndex, nullIndex);
      return true;
    }
    else{
      return false;
    }
  }

  moveDown() {
    const nullIndex = this.getNullIndex();
    if (nullIndex >= 3) {
      const sourceIndex = nullIndex - 4;
      this.moveNullToIndex(sourceIndex, nullIndex);
      return true;
    }
    else{
      return false;
    }
  }

  moveLeft() {
    const nullIndex = this.getNullIndex();
    if (nullIndex % 4 !== 3) {
      const sourceIndex = nullIndex + 1;
      this.moveNullToIndex(sourceIndex, nullIndex);
      return true;
    }
    else{
      return false;
    }
  }

  moveRight() {
    const nullIndex = this.getNullIndex();
    if (nullIndex % 4 !== 0) {
      const sourceIndex = nullIndex - 1;
      this.moveNullToIndex(sourceIndex, nullIndex);
      return true;
    }
    else{
      return false;
    }
  }

  moveTile(index: number) {
    const nullIndex = this.getNullIndex();
    switch (nullIndex) {
      case index - 4:
        this.move(DIRECTION_UP);
        break;
      case index + 4:
        this.move(DIRECTION_DOWN);
        break;
      case index - 1:
        this.move(DIRECTION_LEFT);
        break;
      case index + 1:
        this.move(DIRECTION_RIGHT);
        break;
    }
  }
}
