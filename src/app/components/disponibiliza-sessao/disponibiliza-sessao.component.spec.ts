import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisponibilizaSessaoComponent } from './disponibiliza-sessao.component';

describe('DisponibilizaSessaoComponent', () => {
  let component: DisponibilizaSessaoComponent;
  let fixture: ComponentFixture<DisponibilizaSessaoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DisponibilizaSessaoComponent]
    });
    fixture = TestBed.createComponent(DisponibilizaSessaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
