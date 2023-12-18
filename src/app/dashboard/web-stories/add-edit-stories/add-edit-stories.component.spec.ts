import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditStoriesComponent } from './add-edit-stories.component';

describe('AddEditStoriesComponent', () => {
  let component: AddEditStoriesComponent;
  let fixture: ComponentFixture<AddEditStoriesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditStoriesComponent]
    });
    fixture = TestBed.createComponent(AddEditStoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
