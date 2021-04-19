import { FormsModule } from '@angular/forms';
import { HostListener, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { ComponenteChatComponent } from './componente-chat/componente-chat.component';
import { BotonAbrirChatComponent } from './boton-abrir-chat/boton-abrir-chat.component';


@NgModule({
  declarations: [ ComponenteChatComponent, BotonAbrirChatComponent],
  imports: [
    CommonModule,
    ChatRoutingModule,
    FormsModule
  ],
  exports: [ComponenteChatComponent]
})
export class ChatModule { }
