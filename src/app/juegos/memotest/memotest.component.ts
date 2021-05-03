import { Router } from '@angular/router';
import { Estadisticamemotest } from './../../clases/memotest/estadisticamemotest';
import { MensajesService } from './../../services/mensajes.service';
import { AuthService } from 'src/app/services/auth.service';
import { CardData } from 'src/app/clases/memotest/card-data';
import { MemotestService } from './../../services/juegos/memotest/memotest.service';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import Swal from'sweetalert2';
import { User } from 'src/app/clases/user';
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
  estadistica: Estadisticamemotest;
  @Output() terminoElJuego = new EventEmitter();
  tiempoMinutos:number;
  segundosTranscurridosAux:number;
  private paisesABuscar = [
    'arg',
    'co',
    'br',
    'cl',
    'usa'
  ]
  constructor(
    private memoSvc: MemotestService,
    private authSvc: AuthService,
    private fireSvc: MensajesService,
    private router: Router

  ) {
    this.cardImagesUrl = []
    this.cardImagesUrlAux = []
    this.data = [];
    this.tiempoMinutos = 2;
   }
   swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  })
  presentToast(){
    this.swalWithBootstrapButtons.fire({
      title: 'Has finalizado',
      text: "Desea guardar o reiniciar el juego?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Salir y guardar',
      cancelButtonText: 'Reiniciar juego',
      reverseButtons: true
    }).then((result) => {

      if (result.isConfirmed) {

        this.saveGame();
        this.swalWithBootstrapButtons.fire(
          'Guardado completo',
          'Se guardaron las estadisticas correctamente.',
          'success'
        );
        this.router.navigateByUrl('/');

      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        //recargar pagina
        window.location.reload();
        // this.swalWithBootstrapButtons.fire(
        //   'Cancelled',
        //   'Your imaginary file is safe :)',
        //   'error'
        // )
      }
    })
  }

  saveGame(){
    this.authSvc.obtenerUsuarioLogueado().subscribe(user=>{
      
      // <string>user?.displayName;
      // jugador1.usuario = JSON.parse( localStorage.getItem('usuarioLogueado'));
      
      // jugador1.usuario = JSON.parse(JSON.stringify(usuarioAux));
      // jugador1.usuario.email = usuarioAux.email.slice();
      // jugador1.usuario.uid = usuarioAux.uid.slice();
      // jugador1.usuario.username = usuarioAux.username.slice();
      // jugador1.usuario.uid = usuarioAux.uid;
      // jugador1.usuario.username = usuarioAux.username;
      // jugador1.usuario =localStorage.getItem()
      this.estadistica = new Estadisticamemotest();
      this.estadistica.usuario = new User();
      
      this.estadistica.usuario.email = user.email;
      this.estadistica.usuario.uid = user.uid;
      this.estadistica.usuario.username = user.displayName;
      this.estadistica.fecha = this.estadistica.usuario.obtenerFechaHora();
      this.estadistica.tiempoSegundos = this.segundosTranscurridosAux;
      // console.log(this.estadistica);
      
      this.fireSvc.addMemo(this.estadistica);
    });
  }
  obtenerSegundos(segundosTranscurridos: number){
    // console.log(segundosTranscurridos);
    this.segundosTranscurridosAux = segundosTranscurridos;
  }

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
    // console.log(this.cards);
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
          
          this.detener();
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

    this.presentToast();
    this.juegoIniciado = false;
    
  }
  

}
