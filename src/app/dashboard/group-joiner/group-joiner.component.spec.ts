import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupJoinerComponent } from './group-joiner.component';

describe('GroupJoinerComponent', () => {
  let component: GroupJoinerComponent;
  let fixture: ComponentFixture<GroupJoinerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GroupJoinerComponent]
    });
    fixture = TestBed.createComponent(GroupJoinerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
