import { NavbarModule } from './../navbar/navbar.module';
import { ChatModule } from './../chat/chat.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JuegosRoutingModule } from './juegos-routing.module';
import { PiedraPapelTijeraComponent } from './piedra-papel-tijera/piedra-papel-tijera.component';
import { MemotestComponent } from './memotest/memotest.component';
import { GameCardComponent } from './memotest/game-card/game-card.component';
import { CronometroComponent } from './memotest/cronometro/cronometro.component';
import { PuzzleComponent } from './puzzle/puzzle/puzzle.component';
import { TileComponent } from './puzzle/tile/tile.component';
import { StateComponent } from './puzzle/state/state.component';
import { BoardComponent } from './puzzle/board/board.component';

import {
  BrowserModule,
  HammerModule,
  HammerGestureConfig,
  HAMMER_GESTURE_CONFIG,
} from '@angular/platform-browser';
import * as Hammer from 'hammerjs';
export class MyHammerConfig extends HammerGestureConfig {
  overrides = {
    swipe: { direction: Hammer.DIRECTION_ALL },
  };
}
@NgModule({
  declarations: [PiedraPapelTijeraComponent, MemotestComponent, GameCardComponent, CronometroComponent, PuzzleComponent, TileComponent, StateComponent, BoardComponent],
  imports: [
    CommonModule,
    JuegosRoutingModule,
    ChatModule,
    NavbarModule
  ],
  providers:[{
    provide: HAMMER_GESTURE_CONFIG,
      useClass: MyHammerConfig
  }]
})
export class JuegosModule { }
