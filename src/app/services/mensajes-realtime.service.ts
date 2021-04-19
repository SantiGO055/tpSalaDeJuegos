import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Mensaje } from '../clases/mensaje';

@Injectable({
  providedIn: 'root'
})
export class MensajesRealtimeService {
  private dbPath = '/mensajesChat';

  MensajesRef: AngularFireList<Mensaje>;
  constructor(private db: AngularFireDatabase) {
    this.MensajesRef = db.list(this.dbPath);
   }

  enviarMensaje(unMensajes: Mensaje): any {
    return this.MensajesRef.push(unMensajes);
  }
  getAll(): AngularFireList<Mensaje> {
    return this.MensajesRef;
  }
  update(key: string, value: any): Promise<void> {
    return this.MensajesRef.update(key, value);
  }

  delete(key: string): Promise<void> {
    return this.MensajesRef.remove(key);
  }

  deleteAll(): Promise<void> {
    return this.MensajesRef.remove();
  }
}
