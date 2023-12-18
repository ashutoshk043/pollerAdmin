import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoliticalComponent } from './political.component';

describe('PoliticalComponent', () => {
  let component: PoliticalComponent;
  let fixture: ComponentFixture<PoliticalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PoliticalComponent]
    });
    fixture = TestBed.createComponent(PoliticalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
