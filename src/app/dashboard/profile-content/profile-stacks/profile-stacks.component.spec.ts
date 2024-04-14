import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileStacksComponent } from './profile-stacks.component';

describe('ProfileStacksComponent', () => {
  let component: ProfileStacksComponent;
  let fixture: ComponentFixture<ProfileStacksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileStacksComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfileStacksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
