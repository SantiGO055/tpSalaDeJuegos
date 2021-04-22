import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-cronometro',
  templateUrl: './cronometro.component.html',
  styleUrls: ['./cronometro.component.css']
})
export class CronometroComponent implements OnInit {

  tiempoRestante: Date = null;
  timer: any = null;

  @Input()tiempoMinutos:number;
  _tiempoMinutos: number;
  @Input()juegoIniciado:boolean;
  
  _juegoIniciado: boolean;

  @Output()
  tiempoTerminado = new EventEmitter<any>();

  constructor() {
    this.tiempoRestante= new Date("December 17, 1995 00:00:00");
    this.tiempoRestante = new Date(this.tiempoRestante.setMinutes(
      this.tiempoRestante.getMinutes() + this._tiempoMinutos
    ));
   }

  ngOnInit() {
    // this.detener();
    this.iniciar();
  }

  iniciar() {
    console.log(this.tiempoMinutos)
    this.timer = setInterval(() => {
      if (this.tiempoRestante.getMinutes() === 0 && this.tiempoRestante.getSeconds() === 0) {
        this.detener();
      } else {
        this.tiempoRestante = new Date(this.tiempoRestante.setSeconds(this.tiempoRestante.getSeconds() - 1));
      }
    }, 1000);
    console.log(this.tiempoRestante);
  }

  detener() {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    this.tiempoRestante = new Date(0, 0, 0, 0, 0, 0, 0);
    this.tiempoTerminado.emit();
  }

}
