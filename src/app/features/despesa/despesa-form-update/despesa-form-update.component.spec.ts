import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DespesaFormUpdateComponent } from './despesa-form-update.component';

describe('DespesaFormUpdateComponent', () => {
  let component: DespesaFormUpdateComponent;
  let fixture: ComponentFixture<DespesaFormUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DespesaFormUpdateComponent]
    });
    fixture = TestBed.createComponent(DespesaFormUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
