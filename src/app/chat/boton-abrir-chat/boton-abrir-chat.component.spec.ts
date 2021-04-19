import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotonAbrirChatComponent } from './boton-abrir-chat.component';

describe('BotonAbrirChatComponent', () => {
  let component: BotonAbrirChatComponent;
  let fixture: ComponentFixture<BotonAbrirChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BotonAbrirChatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BotonAbrirChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
