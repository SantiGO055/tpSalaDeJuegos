import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardticComponent } from './boardtic.component';

describe('BoardticComponent', () => {
  let component: BoardticComponent;
  let fixture: ComponentFixture<BoardticComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoardticComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
