import { CardData } from 'src/app/clases/card-data';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MemotestService {
  listaCards:CardData[];
  listaCardsASD:CardData[];
  
  constructor(private http: HttpClient) {
    this.listaCards = [];
    this.listaCardsASD = [];
   }
  obtenerJsonPais(paisCode: string): Observable<CardData>{
    
    return this.http.get<CardData>('https://restcountries.eu/rest/v2/alpha/'+ paisCode);
    
  }
  // obtenerUrl(){
  //   this.paisesABuscar.forEach(pais => {
  //     this.obtenerJsonPais(pais).subscribe((item)=>{
        
  //       this.listaCards.push({...item});
        
  //     });
  //   });
  //   // for (let i = 0; i < this.listaCards.length; i++) {
  //   //   const element = this.listaCards[i];
      
  //   // }
  //   return this.listaCards;
  // }

}
