import { MemotestService } from './../../services/juegos/memotest.service';
import { Component, OnInit } from '@angular/core';
import { CardData } from 'src/app/clases/card-data';

@Component({
  selector: 'app-memotest',
  templateUrl: './memotest.component.html',
  styleUrls: ['./memotest.component.css']
})
export class MemotestComponent implements OnInit {
  data: CardData;
  cardImages:CardData[];
  aux:string[];
  cardImagesUrl:string[];
  cards: CardData[] = [];
  private paisesABuscar = [
    'arg',
    'co',
    'br',
    'cl',
    'usa'
  ]
  constructor(
    private memoSvc: MemotestService
  ) {
    this.cardImagesUrl = []
   }

  ngOnInit(): void {
    this.setupCards();
  }
  
  setupCards(): void {
      this.cards = [];
      this.cardImages = [];
      this.paisesABuscar.forEach(element => {
        this.memoSvc.obtenerJsonPais(element).subscribe((item)=>{
          this.cardImagesUrl.push(item.flag);
          this.cardImagesUrl.push(item.flag);
          
        });
      });
      //cardImages contendra la url obtenida de la api
      // this.cardImages = this.cardImages.slice();
      console.log(this.cardImagesUrl);

        // this.cardImages.push(this.cardImages[0]);
  }
  

}
