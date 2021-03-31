import { AngularFirestore } from '@angular/fire/firestore';
import { UsuariosService } from './services/usuarios.service';

import { environment } from './../environments/environment';
import { AuthService } from './services/auth.service';
import { HttpClientModule } from '@angular/common/http';

import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { WeatherComponent } from './weather/weather.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { LoggedComponent } from './logged/logged.component';
import { QuiensoyComponent } from './quiensoy/quiensoy.component';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
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
    NgbModule
  ],
  providers: [AuthService, UsuariosService],
  bootstrap: [AppComponent]
})
export class AppModule { }
