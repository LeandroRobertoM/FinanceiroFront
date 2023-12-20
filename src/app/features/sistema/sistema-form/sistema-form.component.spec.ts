import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SistemaFormComponent } from './sistema-form.component';

describe('SistemaFormComponent', () => {
  let component: SistemaFormComponent;
  let fixture: ComponentFixture<SistemaFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SistemaFormComponent]
    });
    fixture = TestBed.createComponent(SistemaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
