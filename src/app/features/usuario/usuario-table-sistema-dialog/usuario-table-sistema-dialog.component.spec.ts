import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioTableSistemaDialogComponent } from './usuario-table-sistema-dialog.component';

describe('UsuarioTableSistemaDialogComponent', () => {
  let component: UsuarioTableSistemaDialogComponent;
  let fixture: ComponentFixture<UsuarioTableSistemaDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsuarioTableSistemaDialogComponent]
    });
    fixture = TestBed.createComponent(UsuarioTableSistemaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
