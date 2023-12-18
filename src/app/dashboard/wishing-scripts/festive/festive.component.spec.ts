import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FestiveComponent } from './festive.component';

describe('FestiveComponent', () => {
  let component: FestiveComponent;
  let fixture: ComponentFixture<FestiveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FestiveComponent]
    });
    fixture = TestBed.createComponent(FestiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
