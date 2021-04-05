import { ApiClimaService } from '../../services/api-clima.service';
import { Pronostico } from '../../clases/pronostico';

import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  icono: string = "";
  ciudad: string = "";
  descripcion: string = "";
  ocultoLabel: boolean = true;
  pronostico: Pronostico = new Pronostico(this.ciudad);
  constructor(private serviceApi: ApiClimaService) { }
  ngOnInit(): void {
  }
  pruebaApi(){
    

    this.serviceApi.pruebaApi(this.ciudad).subscribe(data=>{
      
      console.log(data);
      this.icono = data.current.condition.icon;
      this.descripcion = data.current.condition.text;
    });
  }
  ocultarLabel(){
    
      this.ocultoLabel = !this.ocultoLabel;
  }


}
