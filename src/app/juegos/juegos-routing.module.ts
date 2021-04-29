import { BoardticComponent } from './tictactoe/boardtic/boardtic.component';
import { PuzzleComponent } from './puzzle/puzzle/puzzle.component';
import { MemotestComponent } from './memotest/memotest.component';
import { Error404Component } from './../componentes/error404/error404.component';
import { PiedraPapelTijeraComponent } from './piedra-papel-tijera/piedra-papel-tijera.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  // { path: '', component: JuegosComponent }
  { path: 'ppt', component: PiedraPapelTijeraComponent },
  { path: 'memotest', component: MemotestComponent },
  { path: 'puzzle', component: PuzzleComponent },
  { path: 'tictactoe', component: BoardticComponent },
  { path: '', component: Error404Component }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JuegosRoutingModule { }
