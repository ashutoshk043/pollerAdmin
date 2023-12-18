import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OccasionalComponent } from './occasional.component';

describe('OccasionalComponent', () => {
  let component: OccasionalComponent;
  let fixture: ComponentFixture<OccasionalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OccasionalComponent]
    });
    fixture = TestBed.createComponent(OccasionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
