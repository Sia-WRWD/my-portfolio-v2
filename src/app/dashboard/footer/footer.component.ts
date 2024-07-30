import { Component, ElementRef } from '@angular/core';
import { formatDate } from '@angular/common';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faGithub, faFacebookSquare, faInstagram, faLinkedinIn, faHackerrank, faDev, faSteam, faDiscord } from '@fortawesome/free-brands-svg-icons';
import { ScrollService } from '../shared/service/scroll.service';
import { ScrollReachedDirective } from '../shared/directives/scroll-reaches.directive';
import anime from 'animejs/lib/anime.es.js';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [FontAwesomeModule, ScrollReachedDirective],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

  footerAnimationPlayed: boolean = false;
  currentYear: string = "";
  socials: any = [
    { iconName: 'linkedin-in', iconClass: 'linkedin', iconRedirect: 'https://www.linkedin.com/in/Sia-WRWD/' },
    { iconName: 'github', iconClass: 'github', iconRedirect: 'https://github.com/Sia-WRWD' },
    { iconName: 'facebook-square', iconClass: 'facebook', iconRedirect: 'https://www.facebook.com/Sia.WRWD' },
    { iconName: 'instagram', iconClass: 'instagram', iconRedirect: 'https://www.instagram.com/Sia-WRWD/' },
    { iconName: 'hackerrank', iconClass: 'hackerrank', iconRedirect: 'https://www.hackerrank.com/profile/cheezhensia24' },
    { iconName: 'dev', iconClass: 'dev', iconRedirect: 'https://devpost.com/Sia-WRWD' },
    { iconName: 'steam', iconClass: 'steam', iconRedirect: 'https://steamcommunity.com/id/Sia-WRWD/' },
    { iconName: 'discord', iconClass: 'discord', iconRedirect: 'https://www.discord.com/users/370570874438287363' }
  ]

  options: any = [
    { name: "STACKS", anchor: "stacks", icon: "" },
    { name: "WORK-EXP", anchor: "workexp", icon: "" },
    { name: "PROJECTS", anchor: "project", icon: "" },
    { name: "EDUCATION", anchor: "edu", icon: "" },
    { name: "RESUME", anchor: "resume", icon: "" }
  ]

  constructor(library: FaIconLibrary, private el: ElementRef, private scrollService: ScrollService) {
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
    this.getYear();
  }

  getYear() {
    const date = new Date();
    this.currentYear = formatDate(date, "yyyy", "en");
  }

  onFooterIntersection() {
    if (!this.footerAnimationPlayed && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      anime({
        targets: '.footer-header',
        translateX: ['-100%', 0], // Move from left (-100%) to current position (0)
        opacity: [0, 1], // Fade from transparent (0) to opaque (1)
        easing: 'easeInOutQuad', // Use easing for smoother animation
        delay: 1000,
        duration: 1000 // Animation duration in milliseconds
      });

      anime({
        targets: '.footer-logo',
        translateX: ['100%', 0], // Move from left (-100%) to current position (0)
        opacity: [0, 1], // Fade from transparent (0) to opaque (1)
        easing: 'easeInOutQuad', // Use easing for smoother animation
        delay: 1250,
        duration: 1000 // Animation duration in milliseconds
      });

      anime({
        targets: '.footer-socials a',
        translateY: ['100%', 0], // Move from left (-100%) to current position (0)
        opacity: [0, 1], // Fade from transparent (0) to opaque (1)
        easing: 'easeInOutQuad', // Use easing for smoother animation
        delay: anime.stagger(200, { start: 1500 }),
      });

      anime({
        targets: '.footer-link',
        translateY: ['-100%', 0], // Move from left (-100%) to current position (0)
        opacity: [0, 1], // Fade from transparent (0) to opaque (1)
        easing: 'easeInOutQuad', // Use easing for smoother animation
        delay: anime.stagger(200, { start: 1500 }),
      });

      anime({
        targets: '.footer-copyright',
        translateX: ['-100%', 0], // Move from left (-100%) to current position (0)
        opacity: [0, 1], // Fade from transparent (0) to opaque (1)
        easing: 'easeInOutQuad', // Use easing for smoother animation
        delay: 2000,
        duration: 1000 // Animation duration in milliseconds
      });

      this.footerAnimationPlayed = true;
    }
  }

  scrollToSection(sectionId: string) {
    this.scrollService.scrollToSection(sectionId);
  }
}
