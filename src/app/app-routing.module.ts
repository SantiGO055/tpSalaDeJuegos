import { Error404Component } from './componentes/error404/error404.component';
import { RegisterComponent } from './componentes/register/register.component';
import { QuiensoyComponent } from './componentes/quiensoy/quiensoy.component';
import { AuthguardGuard } from './guard/authguard.guard';
import { HomeComponent } from './componentes/home/home.component';

import { LoginComponent } from './componentes/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
const routes: Routes = [
  
  {path: '', component: HomeComponent, canActivate: [AuthguardGuard]},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'home',  component: HomeComponent,canActivate: [AuthguardGuard]},
  { path: 'quienSoy', component: QuiensoyComponent},
  
  { path: 'juegos', loadChildren: () => import('./juegos/juegos.module').then(m => m.JuegosModule) },
  { path: 'ingreso', loadChildren: () => import('./ingreso/ingreso.module').then(m => m.IngresoModule) },
  
  { path: 'navbar', loadChildren: () => import('./navbar/navbar.module').then(m => m.NavbarModule) },
  
  { path: '**', component: Error404Component}
  //para especificar que si no encuentro ninguna ruta redirijo a un componente de error 404
  //router link rutea desde html y la navegacion rutea desde typescript
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
