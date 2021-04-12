import { Router } from '@angular/router';
import { User } from '../../clases/user';
import { AuthService } from '../../services/auth.service';
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
  logueado: boolean = false;
  @Input() usuario : any;


  constructor(private authSvc : AuthService, private router: Router) { }

  ngOnInit(): void {
    
      this.authSvc.afAuth.authState.subscribe(res=>{
        if(res && res.uid){
          this.logueado = true;
          this.usuario.email = res.email;
          this.ocultarMensaje = false;
        }
        else{
          this.logueado = false;
          this.ocultarMensaje = true;
        }
      });
   
  }
  async desloguear(){
    if(this.logueado){
          this.authSvc.afAuth.signOut();
          this.ocultarBotonLogout = false;
          localStorage.removeItem("currentUser");
          this.router.navigate(["/login"]);
          this.logueado = false;
        }
        else{
          this.ocultarBotonLogout = true;
          this.logueado = true;
        }

    }
  

}
