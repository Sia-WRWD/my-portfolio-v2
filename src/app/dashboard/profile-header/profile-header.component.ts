import { Component, ElementRef, ViewChild } from '@angular/core';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faGithub, faInstagram, faFacebookSquare, faLinkedinIn, faHackerrank, faDev, faSteam, faDiscord } from '@fortawesome/free-brands-svg-icons';
import VanillaTilt from 'vanilla-tilt';
import anime from 'animejs/lib/anime.es.js';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { SeasoncheckerService } from '../shared/service/season-checker.service';
import { ProfileContactComponent } from '../profile-content/profile-contact/profile-contact.component';
import { ProfilePic, profilePics } from '../shared/data/profile-pic';

@Component({
  selector: 'app-profile-header',
  standalone: true,
  imports: [FontAwesomeModule, NzModalModule],
  templateUrl: './profile-header.component.html',
  styleUrl: './profile-header.component.scss'
})
export class ProfileHeaderComponent {
  @ViewChild('profileSummaryModal') profileSummaryModal!: ElementRef;

  currentTime: any = "";
  myAge: number = 0;
  myHandle: string = "@Sia-WRWD®";
  isVisible: boolean = false;
  currentProfilePic: any;
  isModalVisible: boolean = false;
  isProfileContentVisible: boolean = true;

  socials: any = [
    { iconName: 'linkedin-in', iconClass: 'linkedin', iconRedirect: 'https://www.linkedin.com/in/Sia-WRWD/' },
    { iconName: 'github', iconClass: 'github', iconRedirect: 'https://github.com/Sia-WRWD' },
    { iconName: 'facebook-square', iconClass: 'facebook', iconRedirect: 'https://www.facebook.com/Sia.WRWD' },
    { iconName: 'instagram', iconClass: 'instagram', iconRedirect: 'https://www.instagram.com/Sia-WRWD/' },
    { iconName: 'hackerrank', iconClass: 'hackerrank', iconRedirect: 'https://www.hackerrank.com/profile/cheezhensia24' },
    { iconName: 'dev', iconClass: 'dev', iconRedirect: 'https://devpost.com/Sia-WRWD' },
    { iconName: 'steam', iconClass: 'steam', iconRedirect: 'https://steamcommunity.com/id/Sia-WRWD/' },
    { iconName: 'discord', iconClass: 'discord', iconRedirect: 'https://www.discord.com/users/370570874438287363' }
  ] //Discord need to add tooltip

  constructor(library: FaIconLibrary, private el: ElementRef, private seasonChecker: SeasoncheckerService) {
    library.addIcons(
      faGithub,
      faFacebookSquare,
      faInstagram,
      faLinkedinIn,
      faHackerrank,
      faDev,
      faSteam,
      faDiscord
    )
  }

  ngOnInit() {
    this.getCurrentTime();
    this.calculateAge();
    this.getCurrentTime();
    this.picOnSeasonChange();
    console.log(this.currentProfilePic)
  }

  ngAfterViewInit() {
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      anime({
        targets: '.anime-profile-header',
        translateY: ['-100%', 0], // Move from left (-100%) to current position (0)
        opacity: [0, 1], // Fade from transparent (0) to opaque (1)
        easing: 'easeInOutQuad', // Use easing for smoother animation
        duration: 1000 // Animation duration in milliseconds
      });
    }

    if (this.shouldApplyTilt() && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      VanillaTilt.init(
        this.el.nativeElement.querySelectorAll('.tilt-object'),
        { max: 30, speed: 100, scale: 1.1 }
      );
    }

    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      this.addPicChangeListeners();
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

  addPicChangeListeners() {
    const imgContainer = document.querySelector('.profile-pic-frame');
    const steamPic = document.querySelector('.steam-pic');
    const realPic = document.querySelector('.real-pic');

    imgContainer!.addEventListener('mouseenter', () => {
      // Animate text content change
      anime({
        targets: steamPic,
        opacity: [1, 0],
        easing: 'easeInOutQuad',
        duration: 500
      });

      anime({
        targets: realPic,
        opacity: [0, 1],
        easing: 'easeInOutQuad',
        duration: 500,
        delay: 100
      });
    });

    imgContainer!.addEventListener('mouseleave', () => {
      // Animate text content back to original
      anime({
        targets: realPic,
        opacity: [1, 0],
        easing: 'easeInOutQuad',
        duration: 500
      });

      anime({
        targets: steamPic,
        opacity: [0, 1],
        easing: 'easeInOutQuad',
        duration: 500,
        delay: 100
      });
    });
  }

  openInfoModal() {
    this.isVisible = true;
  }

  hideInfoModal() {
    this.isVisible = false;
  }

  getCurrentTime() {
    const now = new Date();
    const hours = now.getHours();

    if (hours >= 9 && hours < 18) { //working-time
      this.currentTime = 'work-time';
    } else if (hours >= 18 && hours < 9) { //off-work
      this.currentTime = 'off-time';
    }
  }

  picOnSeasonChange() {
    const season = this.seasonChecker.getCurrentSeason();
    const profilePic = profilePics.find((bg: ProfilePic) => bg.season === season);

    if (profilePic) {
      this.currentProfilePic = {
        profilePicAvatar: profilePic.profilePicAvatar,
        profilePicFrame: profilePic.profilePicFrame,
        profilePicOffAvatar: profilePic.profilePicAvatar,
        profilePicOffFrame: profilePic.profilePicOffFrame
      };
    } else {
      console.error('Season not found!');
    }
  }
}