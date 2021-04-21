import { ChatModule } from './../chat/chat.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JuegosRoutingModule } from './juegos-routing.module';
import { PiedraPapelTijeraComponent } from './piedra-papel-tijera/piedra-papel-tijera.component';


@NgModule({
  declarations: [PiedraPapelTijeraComponent],
  imports: [
    CommonModule,
    JuegosRoutingModule,
    ChatModule
  ]
})
export class JuegosModule { }
