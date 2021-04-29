import { Component, OnInit } from '@angular/core';
import { ScoreService } from 'src/app/services/juegos/tictactoe/score.service';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css']
})
export class ScoreComponent implements OnInit {
  playerScores$ = this.scoreService.playerScores$;
  constructor(private scoreService: ScoreService) {}

  ngOnInit() {}

}
