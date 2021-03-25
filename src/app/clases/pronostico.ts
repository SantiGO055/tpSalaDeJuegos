export class Pronostico {
    icono: string;
    ciudad: string;
    pais: string;
    descripcion: string;
    constructor(ciudad: string){
        this.icono = "";
        this.ciudad = ciudad;
        this.pais = "";
        this.descripcion = "";
    }
}
