import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FancyTextComponent } from './fancy-text.component';

describe('FancyTextComponent', () => {
  let component: FancyTextComponent;
  let fixture: ComponentFixture<FancyTextComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FancyTextComponent]
    });
    fixture = TestBed.createComponent(FancyTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
