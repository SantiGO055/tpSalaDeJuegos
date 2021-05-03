import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-boton-abrir-chat',
  templateUrl: './boton-abrir-chat.component.html',
  styleUrls: ['./boton-abrir-chat.component.css']
})
export class BotonAbrirChatComponent implements OnInit {

  @Output()mostrarChatFunc:EventEmitter<any> = new EventEmitter();
  
  muestroChat: boolean = false;
  
  constructor() { }

  ngOnInit(): void {
  }

  mostrarChat(){
    // console.log(this.muestroChat);
    this.muestroChat = !this.muestroChat;
    this.mostrarChatFunc.emit(this.muestroChat)
  }
}
