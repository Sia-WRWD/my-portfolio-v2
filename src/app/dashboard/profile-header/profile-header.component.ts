import { Component, ElementRef, ViewChild } from '@angular/core';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faGithub, faInstagram, faFacebookSquare, faLinkedinIn, faHackerrank, faDev } from '@fortawesome/free-brands-svg-icons';
import VanillaTilt from 'vanilla-tilt';

@Component({
  selector: 'app-profile-header',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './profile-header.component.html',
  styleUrl: './profile-header.component.scss'
})
export class ProfileHeaderComponent {
  @ViewChild('profileSummaryModal') profileSummaryModal!: ElementRef;

  myAge: number = 0;
  myHandle: string = "@Sia-WRWD®";

  socials: any = [
    { iconName: 'linkedin-in', iconClass: 'linkedin', iconRedirect: 'https://www.linkedin.com/in/scz2401/'},
    { iconName: 'github', iconClass: 'github', iconRedirect: 'https://github.com/sia-wrwd'},
    { iconName: 'facebook-square', iconClass: 'facebook', iconRedirect: 'https://www.facebook.com/WRWD.Alonica'},
    { iconName: 'instagram', iconClass: 'instagram', iconRedirect: 'https://www.instagram.com/wrwd_alonica/'},
    { iconName: 'hackerrank', iconClass: 'hackerrank', iconRedirect: 'https://www.hackerrank.com/profile/cheezhensia24'},
    { iconName: 'dev', iconClass: 'dev', iconRedirect: 'https://devpost.com/Sia-WRWD'}
  ]

  constructor (library: FaIconLibrary, private el: ElementRef) {
    library.addIcons(
      faGithub,
      faFacebookSquare,
      faInstagram,
      faLinkedinIn,
      faHackerrank,
      faDev
    )
  }
  
  ngOnInit() {
    this.calculateAge();
  }

  ngAfterViewInit() {
    if (this.shouldApplyTilt() && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      VanillaTilt.init(
        this.el.nativeElement.querySelectorAll('.tilt-object'),
        { max: 30, speed: 100, scale: 1.1 }
      );
    }
  }

  shouldApplyTilt(): boolean {
    // Adjust the screen width threshold based on your definition of "mobile"
    const mobileScreenWidth = 910;
    return window.innerWidth > mobileScreenWidth;
  }

  setModalVisibility(visible: boolean) {
    if (visible == true) {
      this.profileSummaryModal.nativeElement.style.visibility = "visible";
    } else {
      this.profileSummaryModal.nativeElement.style.visibility = "hidden";
    }
  }

  calculateAge() {
    const today = new Date();
    this.myAge = today.getFullYear() - 2001;
  }
}
