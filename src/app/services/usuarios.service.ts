import { User } from './../clases/user';

import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import {AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore'

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private dbpath = '/usuarios';
  usuariosRef: AngularFirestoreCollection<any>;

  //inicializo la base de datos en mi servicio
  constructor(private db: AngularFirestore) {
    this.usuariosRef = db.collection(this.dbpath);
   }
  //obtengo info
  getAll(): AngularFirestoreCollection<User>{
    return this.usuariosRef;
  }
  //creo info a la base
  create(usuario: User): any{
    return this.usuariosRef.add({...usuario});
  }

}
