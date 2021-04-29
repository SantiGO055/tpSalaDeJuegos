import { Component, OnInit } from '@angular/core';
import { BoardService } from '../board/board.service';

@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.css']
})
export class StateComponent implements OnInit {

  
  constructor(
    public boardService: BoardService,
  ) { }

  ngOnInit(): void {
  }

}
