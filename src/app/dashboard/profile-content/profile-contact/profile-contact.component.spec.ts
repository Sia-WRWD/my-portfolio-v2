import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileContactComponent } from './profile-contact.component';

describe('ProfileContactComponent', () => {
  let component: ProfileContactComponent;
  let fixture: ComponentFixture<ProfileContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileContactComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfileContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
