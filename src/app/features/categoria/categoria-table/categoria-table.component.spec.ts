import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriaTableComponent } from './categoria-table.component';

describe('CategoriaTableComponent', () => {
  let component: CategoriaTableComponent;
  let fixture: ComponentFixture<CategoriaTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategoriaTableComponent]
    });
    fixture = TestBed.createComponent(CategoriaTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
