import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileWorkexpComponent } from './profile-workexp.component';

describe('ProfileWorkexpComponent', () => {
  let component: ProfileWorkexpComponent;
  let fixture: ComponentFixture<ProfileWorkexpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileWorkexpComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfileWorkexpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
