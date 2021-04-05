import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import {AngularFirestoreCollection, AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore'
import { Mensaje } from '../clases/mensaje';
// import { map } from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class MensajesService {
  private dbpath = '/mensajes'; //nombre de la coleccion que creara para los documentos
  mensajesColecction: AngularFirestoreCollection<Mensaje>;
  mensajeDoc: AngularFirestoreDocument<Mensaje> | undefined;
  public mensajes: Observable<Mensaje[]>;

  constructor(public db: AngularFirestore) {
    // this.mensajes = db.collection<Mensaje>('mensajes').valueChanges();
    this.mensajesColecction = db.collection(this.dbpath);
    this.mensajes = this.mensajesColecction.snapshotChanges().pipe(map(actions=>{
      return actions.map(a=>{
        const data = a.payload.doc.data() as Mensaje;
        data.id = a.payload.doc.id;
        return data;
      });
    }));

   }

   getAll(){
    //  return this.db.collection(this.dbpath).snapshotChanges();
    return this.mensajes;
   }
  //  getAll(): AngularFirestoreCollection<Mensaje>{
  //   return this.mensajesColecction;
  // }
  add(mensaje: Mensaje){
    return this.mensajesColecction.add(JSON.parse( JSON.stringify(mensaje)));
    // return this.mensajesColecction.add({...mensaje});
  }
  // getMensajeFromEmail(email: string){
  //   return this.mensajesColecction.ref.get().then((doc)=>{
  //     if(!doc.empty){
  //       console.log(doc.docs[0].data());
  //     }
  //   });
  // }
  deleteMensaje(mensaje: Mensaje){
    this.mensajeDoc = this.db.doc(`mensajes/${mensaje.id}`);
    this.mensajeDoc.delete();
  }

}