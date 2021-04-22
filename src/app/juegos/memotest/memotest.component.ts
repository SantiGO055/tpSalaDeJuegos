import { MemotestService } from './../../services/juegos/memotest/memotest.service';
import { Component, OnInit } from '@angular/core';
import { CardData } from 'src/app/clases/card-data';
@Component({
  selector: 'app-memotest',
  templateUrl: './memotest.component.html',
  styleUrls: ['./memotest.component.css']
})
export class MemotestComponent implements OnInit {
  data: CardData[];
  // cardImages:CardData[];
  aux:string[];
  cardImagesUrl:string[];
  cardImagesUrlAux:string[];
  juegoIniciado: boolean;
  tiempoMinutos:number;
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
    this.cardImagesUrlAux = []
    this.data = [];
    this.tiempoMinutos = 2;
   }

  // ngOnInit(): void {
  //   this.setupCards();
  // }
  
  // setupCards(): void {
  //     this.cardImages = [];
  //     this.paisesABuscar.forEach(element => {
  //       this.memoSvc.obtenerJsonPais(element).subscribe((item)=>{
  //         this.cardImagesUrl.push(item.url);
  //         this.shuffleArray(this.cardImagesUrl);
  //         this.cardImagesUrlAux.push(item.url);
          
  //         this.shuffleArray(this.cardImagesUrlAux);
          
  //       });
  //     });
  //     this.cardImages.forEach((image) => {
  //       const cardData: CardData = {
  //         url: image.url,
  //         state: 'default'
  //       };
  
  //       this.cards.push({ ...cardData });
  //       this.cards.push({ ...cardData });
  //     });
  //     //cardImages contendra la url obtenida de la api
  //     // this.cardImages = this.cardImages.slice();
  //     // console.log(this.shuffleArray(this.cardImagesUrl));
  //     // this.cards=this.shuffleArray(this.cards);
  //     console.log(this.cards);
  //     console.log(this.cardImagesUrlAux);
  //     console.log(this.cardImagesUrl);
  //       // this.cardImages.push(this.cardImages[0]);
  // }
  // shuffleArray(array: string[]): string[] {
    
  //     for (let i = array.length - 1; i > 0; i--) {
  //       let indiceAleatorio = Math.floor(Math.random() * (i + 1));
  //       let temporal = array[i];
  //       array[i] = array[indiceAleatorio];
  //       array[indiceAleatorio] = temporal;
  //     }
    
  //   // let newArray = array.sort(()=> Math.random() - 0.5);
  //   // console.log(newArray);
  //   return array;
  //   // return anArray.sort(function() { return Math.random() - 0.5 });
  //   // return anArray.map(a => [Math.random(), a])
  //   //   .sort((a, b) => a[0] - b[0])
  //   //   .map(a => a[1]);
  // }
  
  cardImages = [
    'pDGNBK9A0sk',
    'fYDrhbVlV1E',
    'qoXgaF27zBc',
    'b9drVB7xIOI',
    'TQ-q5WAVHj0'
  ];

  cards: CardData[] = [];

  flippedCards: CardData[] = [];

  matchedCount = 0;

  shuffleArray(anArray: any[]): any[] {
    return anArray.map(a => [Math.random(), a])
      .sort((a, b) => a[0] - b[0])
      .map(a => a[1]);
  }

  ngOnInit(): void {
    this.setupCards();
    this.juegoIniciado = true;
  }

  setupCards(): void {
    this.cardImages.forEach((image) => {
      const cardData: CardData = {
        url: image,
        state: 'default'
      };

      this.cards.push({ ...cardData });
      this.cards.push({ ...cardData });

    });
    console.log(this.cards);
    this.cards = this.shuffleArray(this.cards);
  }

  cardClicked(index: number): void {
    const cardInfo = this.cards[index];

    if (cardInfo.state === 'default' && this.flippedCards.length < 2) {
      cardInfo.state = 'flipped';
      this.flippedCards.push(cardInfo);

      if (this.flippedCards.length > 1) {
        this.checkForCardMatch();
      }

    } else if (cardInfo.state === 'flipped') {
      cardInfo.state = 'default';
      this.flippedCards.pop();

    }
  }

  checkForCardMatch(): void {
    setTimeout(() => {
      const cardOne = this.flippedCards[0];
      const cardTwo = this.flippedCards[1];
      const nextState = cardOne.url === cardTwo.url ? 'matched' : 'default';
      cardOne.state = cardTwo.state = nextState;

      this.flippedCards = [];

      if (nextState === 'matched') {
        this.matchedCount++;

        if (this.matchedCount === this.cardImages.length) {
          // const dialogRef = this.dialog.open(RestartDialogComponent, {
          //   disableClose: true
          // });

          // dialogRef.afterClosed().subscribe(() => {
          //   this.restart();
          // });
        }
      }

    }, 1000);
  }

  restart(): void {
    this.matchedCount = 0;
    this.setupCards();
  }
  detener() {
    this.juegoIniciado = false;
    
  }
  

}
