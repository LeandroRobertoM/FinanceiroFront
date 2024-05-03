import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioFormUpdateComponent } from './usuario-form-update.component';

describe('UsuarioFormUpdateComponent', () => {
  let component: UsuarioFormUpdateComponent;
  let fixture: ComponentFixture<UsuarioFormUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsuarioFormUpdateComponent]
    });
    fixture = TestBed.createComponent(UsuarioFormUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
