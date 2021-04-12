import { AuthguardGuard } from './../guard/authguard.guard';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IngresoRoutingModule } from './ingreso-routing.module';
import { IngresoComponent } from './ingreso.component';
import { RegistroComponent } from './registro/registro.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [IngresoComponent, RegistroComponent, LoginComponent],
  imports: [
    CommonModule,
    IngresoRoutingModule,
    FormsModule
  ],
  
})
export class IngresoModule { }
