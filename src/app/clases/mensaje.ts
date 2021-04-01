import { User } from "./user";

export class Mensaje {
    mensaje: string;
    usuario: User;
    constructor(mensaje:string, usuario: User){
        this.mensaje = mensaje;
        this.usuario = usuario;
    }
}
