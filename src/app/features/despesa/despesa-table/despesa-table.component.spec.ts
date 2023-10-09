import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DespesaTableComponent } from './despesa-table.component';

describe('DespesaTableComponent', () => {
  let component: DespesaTableComponent;
  let fixture: ComponentFixture<DespesaTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DespesaTableComponent]
    });
    fixture = TestBed.createComponent(DespesaTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
