import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SistemaFormUpdateComponent } from './sistema-form-update.component';

describe('SistemaFormUpdateComponent', () => {
  let component: SistemaFormUpdateComponent;
  let fixture: ComponentFixture<SistemaFormUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SistemaFormUpdateComponent]
    });
    fixture = TestBed.createComponent(SistemaFormUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
