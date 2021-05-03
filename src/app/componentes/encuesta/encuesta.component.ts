import { Router } from '@angular/router';
import { MensajesService } from './../../services/mensajes.service';
import { User } from './../../clases/user';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Encuesta } from 'src/app/clases/encuesta';

import Swal from'sweetalert2';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.css']
})
export class EncuestaComponent implements OnInit {

  public formGroup!: FormGroup;
  user: User = new User();
  encuesta: Encuesta = new Encuesta();
  constructor(
    private fb:FormBuilder,
    private authSvc: AuthService,
    private mensajeSvc: MensajesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      'nombre': ['',[Validators.required]],
      'apellido': ['',Validators.required],
      'edad': ['',[Validators.required,Validators.min(18),Validators.max(99)]],
      'telefono': ['',[Validators.required,Validators.min(1111111111),Validators.max(9999999999)]],
      'ppt': ['',],
      'memotest': ['',],
      'tateti': ['',],
      'rompecabezas': ['',],
      'ninguno': ['',],
      'cambios': ['',],
      'recomienda': ['',],
      // 'nacionalidad':[{value: '', disabled: true}],
      // 'email': ['',[Validators.required,Validators.email]],
    });



    this.formGroup.get("ninguno").valueChanges.subscribe(val=>{
      // console.log(val);
      if(val){
        this.formGroup.get("ppt").disable();
        this.formGroup.get("memotest").disable();
        this.formGroup.get("tateti").disable();
        this.formGroup.get("rompecabezas").disable();
      }
      //enable the second checkbox
      else{
        this.formGroup.get("ppt").enable();
        this.formGroup.get("memotest").enable();
        this.formGroup.get("tateti").enable();
        this.formGroup.get("rompecabezas").enable();
      }
      //disable the second checkbox
    });
  }
  mostrarMensaje(){
    Swal.fire({
      title: 'Encuesta enviada',
      timer: 2000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading()
      },
      willClose: () => {

      }
    }).then((result) => {
      /* Read more about handling dismissals below */
      if (result.dismiss === Swal.DismissReason.timer) {
        // console.log('Se envio la encuesta')
      }
    })
  }
  enviarEncuesta(){
    console.log(this.formGroup.getRawValue());
    this.authSvc.obtenerUsuarioLogueado().subscribe(user=>{
      this.user.email = user.email;
      this.user.uid = user.uid;
      this.user.username = user.displayName;

      this.encuesta = this.formGroup.getRawValue();
      this.encuesta.usuario = this.user;
      this.encuesta.fecha = this.user.obtenerFechaHora();
      this.mensajeSvc.addEncuesta(this.encuesta);
      this.mostrarMensaje();
      this.router.navigate(["home"]);
    })

  }
  

}
