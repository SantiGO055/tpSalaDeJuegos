import { User } from './../clases/user';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import {AngularFirestoreCollection, AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore'
import { Mensaje } from '../clases/mensaje';
import { Estadistica } from '../clases/puzzle/estadistica';

// import { map } from 'jquery';

@Injectable({
  providedIn: 'root',
  
})
export class MensajesService {
  private dbpath = '/mensajes'; //nombre de la coleccion que creara para los documentos
  private dbPathPuzzle = '/juegos-puzzle'; //nombre de la coleccion que creara para los documentos
  mensajesColecction: AngularFirestoreCollection<Mensaje>;
  puzzleColecction: AngularFirestoreCollection<Estadistica>;
  mensajeDoc: AngularFirestoreDocument<Mensaje> | undefined;
  public mensajes: Observable<Mensaje[]>;
  public puzzleEstadistica: Observable<Estadistica[]>;
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
    this.puzzleColecction = db.collection(this.dbPathPuzzle);
    this.puzzleEstadistica = this.puzzleColecction.snapshotChanges().pipe(map(actions=>{
      return actions.map(a=>{
        const data = a.payload.doc.data() as unknown as Estadistica;
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
  updateMensaje(mensaje: Mensaje){
    
    this.mensajeDoc = this.db.doc(`mensajes/${mensaje.id}`);
    this.mensajeDoc.update(mensaje);
  }
  addEstadisticaPuzzle(estadisticaPuzzle: Estadistica){

    console.log(estadisticaPuzzle);
    return this.puzzleColecction.add(JSON.parse( JSON.stringify(estadisticaPuzzle)));

  }
  // getEmail(user: User){

  //   this.mensajes.forEach(element => {
      
  //     console.log(element);
  //   });
  //   // this.mensajes
  //   // this.db.collection(this.dbpath).doc()
  //   // user.email
  // }

}