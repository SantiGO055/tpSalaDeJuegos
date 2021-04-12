import { User } from '../../clases/user';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { UsuariosService } from '../../services/usuarios.service';
import { LoginComponent } from './../login/login.component';
import { NavbarComponent } from './../navbar/navbar.component';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Collection } from 'typescript';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  flagLogueado: boolean = true;
  usuarioLogueado: any = "";
  email:any = '';
  usuario: User = new User();
  
  constructor(private usuariosService: UsuariosService, private authSvc : AuthService) { }

  ngOnInit(): void {
    
  }
  obtenerUsuario(){
    this.authSvc.afAuth.authState.subscribe(res=>{
      if(res && res.uid){
        
        return this.usuariosService.obtenerUsuarioPorEmail(this.email);
      }
      return null;
    });

  }


}
