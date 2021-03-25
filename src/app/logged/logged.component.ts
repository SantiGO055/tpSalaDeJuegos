import { User } from './../clases/user';
import { AuthService } from './../services/auth.service';
import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-logged',
  templateUrl: './logged.component.html',
  styleUrls: ['./logged.component.css']
})
export class LoggedComponent implements OnInit {
  
  ocultarLogin: boolean = false;
  ocultarRegistro: boolean = false;
  ocultarMensaje : boolean = true;
  ocultarBotonLogout : boolean = true;

  @Input() usuario : any;

  constructor(private authSvc : AuthService) { }

  ngOnInit(): void {
    
      this.authSvc.afAuth.authState.subscribe(res=>{
        if(res && res.uid){
          this.usuario.email = res.email;
          console.log(this.usuario);
          // this.ocultarLogin = true;
          // this.ocultarRegistro = true;
          this.ocultarMensaje = false;
        }
        else{
          // this.ocultarLogin = false;
          // this.ocultarRegistro = false;
          this.ocultarMensaje = true;
        }
      });
   
  }
  async desloguear(){
    this.authSvc.afAuth.authState.subscribe(res=>{
      if(res && res.uid){
        this.authSvc.afAuth.signOut();
        this.ocultarBotonLogout = false;
        console.log(res.email);
      }
      else{
        this.ocultarBotonLogout = true;
      }
    })
  }

}