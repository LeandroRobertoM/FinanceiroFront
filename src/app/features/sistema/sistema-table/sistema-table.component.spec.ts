import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SistemaTableComponent } from './sistema-table.component';

describe('SistemaTableComponent', () => {
  let component: SistemaTableComponent;
  let fixture: ComponentFixture<SistemaTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SistemaTableComponent]
    });
    fixture = TestBed.createComponent(SistemaTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
