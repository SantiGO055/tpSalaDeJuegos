import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import {AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore'
import { Mensaje } from '../clases/mensaje';

@Injectable({
  providedIn: 'root'
})
export class MensajesService {
  private dbpath = '/mensajes'; //nombre de la coleccion que creara para los documentos
  mensajesRef: AngularFirestoreCollection<any>;

  constructor(private db: AngularFirestore) {
    this.mensajesRef = db.collection(this.dbpath);
   }
   getAll(): AngularFirestoreCollection<Mensaje>{
    return this.mensajesRef;
  }
  create(mensaje: Mensaje): any{
    return this.mensajesRef.add({...mensaje});
  }
  getMensajeFromEmail(email: string){
    return this.mensajesRef.ref.get().then((doc)=>{
      if(!doc.empty){
        console.log(doc.docs[0].data());
      }
    });
  }

}
