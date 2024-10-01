import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DespesaRecorrenteDialogComponent } from './despesa-recorrente-dialog.component';

describe('DespesaRecorrenteDialogComponent', () => {
  let component: DespesaRecorrenteDialogComponent;
  let fixture: ComponentFixture<DespesaRecorrenteDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DespesaRecorrenteDialogComponent]
    });
    fixture = TestBed.createComponent(DespesaRecorrenteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
