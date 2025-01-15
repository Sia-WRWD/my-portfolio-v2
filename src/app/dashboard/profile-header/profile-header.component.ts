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
  imports: [FontAwesomeModule, NzModalModule, ProfileContactComponent],
  templateUrl: './profile-header.component.html',
  styleUrl: './profile-header.component.scss'
})
export class ProfileHeaderComponent {
  @ViewChild('profileSummaryModal') profileSummaryModal!: ElementRef;

  currentTime: any = "";
  myAge: number = 0;
  myHandle: string = "@Sia-WRWD®";
  isVisible: boolean = false;
<<<<<<< HEAD
  profilePicFrame: string = "";
  profilePicAvatar: string = "";
  profilePicOffFrame: string = "";
  profilePicOffAvatar: string = "";
=======
  currentProfilePic: any;
>>>>>>> 17cecba3699642ab5850731a325a7e0b2b809659
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

<<<<<<< HEAD
    // Define the seasons by date ranges
    if (season == "Winter") { //Winter
      this.profilePicAvatar = "https://cdn.fastly.steamstatic.com/steamcommunity/public/images/items/2861720/5ae020a665661d3e6499da7fb601f373fa998228.gif"; // Need to change
      this.profilePicFrame = "https://cdn.fastly.steamstatic.com/steamcommunity/public/images/items/2861720/410eecdbc6f2505e98863ab4200ca454032b40a2.png"; // Need to change

      this.profilePicOffAvatar = "https://cdn.fastly.steamstatic.com/steamcommunity/public/images/items/2861720/5ae020a665661d3e6499da7fb601f373fa998228.gif";
      this.profilePicOffFrame = "https://cdn.fastly.steamstatic.com/steamcommunity/public/images/items/2861720/410eecdbc6f2505e98863ab4200ca454032b40a2.png";
    } else if (season == "Spring") { //Done
      this.profilePicAvatar = "https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/items/2855140/4fd8a06b61d271c4eb71c85df79268429de46d63.gif";
      this.profilePicFrame = "https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/items/2855140/e322e4d4fc9df256d9c9d5166a9e86aa6e47bd03.png";

      this.profilePicOffAvatar = "https://cdn.fastly.steamstatic.com/steamcommunity/public/images/items/2855140/18201b6931880d3bcb863fc3f5f5d0f3889f5c68.gif";
      this.profilePicOffFrame = "https://cdn.fastly.steamstatic.com/steamcommunity/public/images/items/2855140/4324f3a8e05e1c110fad71443d61c7ba82c4e474.png";
    } else if (season == "Summer") { //Done
      this.profilePicAvatar = "https://cdn.akamai.steamstatic.com/steamcommunity/public/images/items/2861690/c6de335c0a6737e5105eef701af2d3284ab513c4.gif";
      this.profilePicFrame = "https://cdn.akamai.steamstatic.com/steamcommunity/public/images/items/2861690/b921dcff9e6fffb20bd91b29700ead7468f36737.png";

      this.profilePicOffAvatar = "https://cdn.fastly.steamstatic.com/steamcommunity/public/images/items/2861690/0d81afcfee604d3b93b374ac74c2ce2d34a5b63a.gif";
      this.profilePicOffFrame = "https://cdn.fastly.steamstatic.com/steamcommunity/public/images/items/2861690/396aa5ec2a44df7548ffa2bcc5383eef91095a4b.png";
    } else if (season == "Autumn") { //Autumn
      this.profilePicAvatar = "https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/items/2855140/4fd8a06b61d271c4eb71c85df79268429de46d63.gif"; // Need to change
      this.profilePicFrame = "https://cdn.fastly.steamstatic.com/steamcommunity/public/images/items/2861700/67498b6c05c5835f35f3eced8fa689cbbe0ac117.png";

      this.profilePicOffAvatar = "https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/items/2855140/4fd8a06b61d271c4eb71c85df79268429de46d63.gif"; // Need to change
      this.profilePicOffFrame = "https://cdn.fastly.steamstatic.com/steamcommunity/public/images/items/2861700/67498b6c05c5835f35f3eced8fa689cbbe0ac117.png"; // Need to change

=======
    if (profilePic) {
      this.currentProfilePic = {
        profilePicSteam: profilePic.profilePicSteam,
        profilePicFrame: profilePic.profilePicFrame,
        profileOffPicSteam: profilePic.profileOffPicSteam,
        profileOffPicFrame: profilePic.profileOffPicFrame
      };
    } else {
      console.error('Season not found!');
>>>>>>> 17cecba3699642ab5850731a325a7e0b2b809659
    }
  }
}