// import { LoggedComponent } from './../componentes/logged/logged.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavbarRoutingModule } from './navbar-routing.module';
import { NavbarComponent } from './navbar.component';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { LoggedComponent } from './logged/logged.component';
@NgModule({
  declarations: [NavbarComponent, LoggedComponent],
  imports: [
    CommonModule,
    NavbarRoutingModule,
    NgbCollapseModule,
    NgbModule,
  ],
  exports: [NavbarComponent]
})
export class NavbarModule { }
