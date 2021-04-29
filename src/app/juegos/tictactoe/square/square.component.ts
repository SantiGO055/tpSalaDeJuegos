import { Component, Input, OnInit } from '@angular/core';
import { Square } from './square';

@Component({
  selector: 'app-square',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.css']
})
export class SquareComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  @Input() value: Square;
  @Input() disabled = false;

}
