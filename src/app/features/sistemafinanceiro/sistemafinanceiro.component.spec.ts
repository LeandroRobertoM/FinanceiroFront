import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SistemafinanceiroComponent } from './sistemafinanceiro.component';

describe('SistemafinanceiroComponent', () => {
  let component: SistemafinanceiroComponent;
  let fixture: ComponentFixture<SistemafinanceiroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SistemafinanceiroComponent]
    });
    fixture = TestBed.createComponent(SistemafinanceiroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
