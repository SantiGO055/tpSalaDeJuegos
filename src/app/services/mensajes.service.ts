import { Encuesta } from './../clases/encuesta';
import { Estadisticamemotest } from './../clases/memotest/estadisticamemotest';
import { Estadisticatateti } from './../clases/tateti/estadisticatateti';

import { User } from './../clases/user';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import {AngularFirestoreCollection, AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore'
import { Mensaje } from '../clases/mensaje';
import { Estadisticapuzzle } from '../clases/puzzle/estadisticapuzzle';
import { Estadisticappt } from '../clases/ppt/estadisticappt';

// import { map } from 'jquery';

@Injectable({
  providedIn: 'root',
  
})
export class MensajesService {
  public formCompleted: boolean = false;
  private dbpath = '/mensajes'; //nombre de la coleccion que creara para los documentos
  private dbPathPuzzle = '/juegos-puzzle'; //nombre de la coleccion que creara para los documentos
  private dbPathTateti = '/juegos-tateti'; //nombre de la coleccion que creara para los documentos
  private dbPathPpt = '/juegos-ppt'; //nombre de la coleccion que creara para los documentos
  private dbPathMemo = '/juegos-memotest'; //nombre de la coleccion que creara para los documentos
  private dbPathEncuesta = '/encuesta'; //nombre de la coleccion que creara para los documentos
  mensajesColecction: AngularFirestoreCollection<Mensaje>;
  puzzleColecction: AngularFirestoreCollection<Estadisticapuzzle>;
  tatetiCollection: AngularFirestoreCollection<Estadisticatateti>;
  pptCollection: AngularFirestoreCollection<Estadisticappt>;
  memoCollection: AngularFirestoreCollection<Estadisticamemotest>;
  encuestaCollection: AngularFirestoreCollection<Encuesta>;



  mensajeDoc: AngularFirestoreDocument<Mensaje> | undefined;
  public mensajes: Observable<Mensaje[]>;
  public encuesta: Observable<Encuesta[]>;
  public puzzleEstadistica: Observable<Estadisticapuzzle[]>;
  public memoEstadistica: Observable<Estadisticamemotest[]>;
  public tatetiEstadistica: Observable<Estadisticatateti[]>;
  public pptEstadistica: Observable<Estadisticappt[]>;
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
        const data = a.payload.doc.data() as unknown as Estadisticapuzzle;
        data.id = a.payload.doc.id;
        return data;
      });
    }));

    this.tatetiCollection = db.collection(this.dbPathTateti);
    this.tatetiEstadistica = this.tatetiCollection.snapshotChanges().pipe(map(actions=>{
      return actions.map(a=>{
        const data = a.payload.doc.data() as unknown as Estadisticatateti;
        data.id = a.payload.doc.id;
        return data;
      });
    }));
    this.pptCollection = db.collection(this.dbPathPpt);
    this.pptEstadistica = this.pptCollection.snapshotChanges().pipe(map(actions=>{
      return actions.map(a=>{
        const data = a.payload.doc.data() as unknown as Estadisticappt;
        data.id = a.payload.doc.id;
        return data;
      });
    }));
    this.memoCollection = db.collection(this.dbPathMemo);
    this.memoEstadistica = this.memoCollection.snapshotChanges().pipe(map(actions=>{
      return actions.map(a=>{
        const data = a.payload.doc.data() as unknown as Estadisticamemotest;
        data.id = a.payload.doc.id;
        return data;
      });
    }));

    this.encuestaCollection = db.collection(this.dbPathEncuesta);
    this.encuesta = this.encuestaCollection.snapshotChanges().pipe(map(actions=>{
      return actions.map(a=>{
        const data = a.payload.doc.data() as unknown as Encuesta;
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
  addTateti(estadisticaTateti: Estadisticatateti){
    return this.tatetiCollection.add(JSON.parse( JSON.stringify(estadisticaTateti)));
  }
  // getMensajeFromEmail(email: string){
  //   return this.mensajesColecction.ref.get().then((doc)=>{
  //     if(!doc.empty){
  //       console.log(doc.docs[0].data());
  //     }
  //   });
  // }
  addMemo(estadisticaMemo: Estadisticamemotest){
    return this.memoCollection.add(JSON.parse( JSON.stringify(estadisticaMemo)));
  }
  addEncuesta(encuesta: Encuesta){
    this.formCompleted = true;
    return this.encuestaCollection.add(JSON.parse( JSON.stringify(encuesta)));
  }

  getAllEncuesta(){
    return this.encuesta;
  }
  
  deleteMensaje(mensaje: Mensaje){
    this.mensajeDoc = this.db.doc(`mensajes/${mensaje.id}`);
    this.mensajeDoc.delete();
  }
  updateMensaje(mensaje: Mensaje){
    
    this.mensajeDoc = this.db.doc(`mensajes/${mensaje.id}`);
    this.mensajeDoc.update(mensaje);
  }
  addEstadisticaPuzzle(estadisticaPuzzle: Estadisticapuzzle){

    console.log(estadisticaPuzzle);
    return this.puzzleColecction.add(JSON.parse( JSON.stringify(estadisticaPuzzle)));

  }
  addPPT(estadisticaPPT: Estadisticappt){
    return this.pptCollection.add(JSON.parse( JSON.stringify(estadisticaPPT)));
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