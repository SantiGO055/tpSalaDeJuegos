import { AuthguardGuard } from './guard/authguard.guard';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuiensoyComponent } from './quiensoy/quiensoy.component';
import { AppComponent } from './app.component';
const routes: Routes = [
  
  {path: '', canActivate: [AuthguardGuard], component: AppComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'home', canActivate: [AuthguardGuard], component: AppComponent},
  { path: 'quienSoy', canActivate: [AuthguardGuard], component: AppComponent},
  //puedo hacer { path: '**', component: HomeComponent}
  //para especificar que si no encuentro ninguna ruta redirijo a un componente de error 404
  //router link rutea desde html y la navegacion rutea desde typescript
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
