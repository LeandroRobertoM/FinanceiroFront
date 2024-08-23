import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetConfirmationComponent } from './reset-confirmation.component';

describe('ResetConfirmationComponent', () => {
  let component: ResetConfirmationComponent;
  let fixture: ComponentFixture<ResetConfirmationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResetConfirmationComponent]
    });
    fixture = TestBed.createComponent(ResetConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
