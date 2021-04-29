import { CardData } from 'src/app/clases/memotest/card-data';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MemotestService {
  listaCards:CardData[];
  
  constructor(private http: HttpClient) {
    this.listaCards = [];
   }
  obtenerJsonPais(paisCode: string): Observable<CardData>{
    
    return this.http.get<CardData>('https://restcountries.eu/rest/v2/alpha/'+ paisCode);
    
  }

}
