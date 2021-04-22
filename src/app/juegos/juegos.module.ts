import { NavbarModule } from './../navbar/navbar.module';
import { ChatModule } from './../chat/chat.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JuegosRoutingModule } from './juegos-routing.module';
import { PiedraPapelTijeraComponent } from './piedra-papel-tijera/piedra-papel-tijera.component';
import { MemotestComponent } from './memotest/memotest.component';
import { GameCardComponent } from './memotest/game-card/game-card.component';
import { CronometroComponent } from './memotest/cronometro/cronometro.component';


@NgModule({
  declarations: [PiedraPapelTijeraComponent, MemotestComponent, GameCardComponent, CronometroComponent],
  imports: [
    CommonModule,
    JuegosRoutingModule,
    ChatModule,
    NavbarModule
  ]
})
export class JuegosModule { }
