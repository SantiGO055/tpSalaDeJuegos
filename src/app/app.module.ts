import { WeatherComponent } from './componentes/weather/weather.component';
import { LoginComponent } from './componentes/login/login.component';
import { NavbarComponent } from './componentes/navbar/navbar.component';

import { AngularFirestoreModule } from '@angular/fire/firestore';
import { UsuariosService } from './services/usuarios.service';
import { environment } from './../environments/environment';
import { AuthService } from './services/auth.service';
import { HttpClientModule } from '@angular/common/http';

import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './componentes/register/register.component';

import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './componentes/home/home.component';
import { LoggedComponent } from './componentes/logged/logged.component';
import { QuiensoyComponent } from './componentes/quiensoy/quiensoy.component';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { MensajesComponent } from './componentes/mensajes/mensajes.component';

import { Error404Component } from './componentes/error404/error404.component';
import { SalaChatComponent } from './componentes/sala-chat/sala-chat.component';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    WeatherComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    LoggedComponent,
    QuiensoyComponent,
    MensajesComponent,
    Error404Component,
    SalaChatComponent,
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    ReactiveFormsModule,
    CommonModule,
    AngularFireDatabaseModule,
    NgbCollapseModule,
    NgbModule,
    AngularFirestoreModule

  ],
  providers: [AuthService, UsuariosService],
  bootstrap: [AppComponent]
})
export class AppModule { }
