import { Component, ElementRef } from '@angular/core';
import { formatDate } from '@angular/common';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faGithub, faFacebookSquare, faInstagram, faLinkedinIn, faHackerrank, faDev, faSteam, faDiscord } from '@fortawesome/free-brands-svg-icons';
import { ScrollService } from '../shared/service/scroll.service';
import { ScrollReachedDirective } from '../shared/directives/scroll-reaches.directive';
import anime from 'animejs/lib/anime.es.js';
import { IntroService } from '../shared/service/intro.service';

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

  constructor(library: FaIconLibrary, private el: ElementRef, private scrollService: ScrollService,
    private intro: IntroService) {
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
      // Starts as the footer panel (animated by the dashboard on the same slot) settles in.
      const delay = this.intro.delayFor(700) + 200;
      const clearTransforms = (anim: any) => anim.animatables.forEach((a: any) => a.target.style.removeProperty('transform'));

      anime({
        targets: '.footer-header',
        translateX: [-60, 0],
        opacity: [0, 1],
        easing: 'easeOutCubic',
        delay,
        duration: 650,
        complete: clearTransforms
      });

      anime({
        targets: '.footer-logo',
        translateX: [60, 0],
        rotate: [8, 0],
        opacity: [0, 1],
        easing: 'easeOutBack',
        delay: delay + 100,
        duration: 700,
        complete: clearTransforms
      });

      anime({
        targets: '.footer-socials a',
        translateY: [20, 0],
        opacity: [0, 1],
        easing: 'easeOutBack',
        duration: 450,
        delay: anime.stagger(50, { start: delay + 200 }),
        complete: clearTransforms
      });

      anime({
        targets: '.footer-link',
        translateY: [-16, 0],
        opacity: [0, 1],
        easing: 'easeOutCubic',
        duration: 450,
        delay: anime.stagger(60, { start: delay + 250 }),
        complete: clearTransforms
      });

      anime({
        targets: '.footer-copyright',
        opacity: [0, 1],
        easing: 'easeOutCubic',
        delay: delay + 450,
        duration: 500
      });

      this.footerAnimationPlayed = true;
    }
  }

  scrollToSection(sectionId: string) {
    this.scrollService.scrollToSection(sectionId);
  }
}
