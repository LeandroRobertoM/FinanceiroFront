import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriaFormUpdateComponent } from './categoria-form-update.component';

describe('CategoriaFormUpdateComponent', () => {
  let component: CategoriaFormUpdateComponent;
  let fixture: ComponentFixture<CategoriaFormUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategoriaFormUpdateComponent]
    });
    fixture = TestBed.createComponent(CategoriaFormUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
