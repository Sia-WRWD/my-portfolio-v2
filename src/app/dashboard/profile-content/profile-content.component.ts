import { Component, ElementRef, ViewChild } from '@angular/core';
import anime from 'animejs/lib/anime.es.js';
import { ProfileStacksComponent } from './profile-stacks/profile-stacks.component';
import { ProfileEducationComponent } from './profile-education/profile-education.component';
import { ProfileProjectComponent } from './profile-project/profile-project.component';
import { ProfileWorkexpComponent } from './profile-workexp/profile-workexp.component';
import { ProfileContactComponent } from './profile-contact/profile-contact.component';
import { InViewportDirective } from 'ng-in-viewport';

@Component({
  selector: 'app-profile-content',
  standalone: true,
  imports: [ProfileStacksComponent, ProfileEducationComponent, ProfileProjectComponent, ProfileWorkexpComponent, ProfileContactComponent, InViewportDirective],
  templateUrl: './profile-content.component.html',
  styleUrl: './profile-content.component.scss'
})
export class ProfileContentComponent {

  stacksAnimationPlayed: boolean = false;
  workexpAnimationPlayed: boolean = false;
  workexpDelay: number = 0;
  projAnimationPlayed: boolean = false;
  eduAnimationPlayed: boolean = false;

  ngOnInit() {
    if (window.innerWidth > 882) {
      this.workexpDelay = 1000;
    } else {
      this.workexpDelay = 0;
    }
  }

  onStacksIntersection({ target, visible }: { target: Element; visible: boolean }): void {
    if (this.stacksAnimationPlayed == false && visible && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      anime({
        targets: '.anime-profile-stacks',
        translateX: ['-100%', 0], // Move from left (-100%) to current position (0)
        opacity: [0, 1], // Fade from transparent (0) to opaque (1)
        easing: 'easeInOutQuad', // Use easing for smoother animation
        delay: 500,
        duration: 1000, // Animation duration in milliseconds
        loop: false
      });
      this.stacksAnimationPlayed = true;
    }
  }

  onWorkExpIntersection({ target, visible }: { target: Element; visible: boolean }): void {
    if (!this.workexpAnimationPlayed && visible && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      anime({
        targets: '.anime-profile-workexp',
        translateX: ['100%', 0], // Move from left (-100%) to current position (0)
        opacity: [0, 1], // Fade from transparent (0) to opaque (1)
        easing: 'easeInOutQuad', // Use easing for smoother animation
        delay: this.workexpDelay,
        duration: 1000 // Animation duration in milliseconds
      });
      this.workexpAnimationPlayed = true;
    }
  }

  onProjIntersection({ target, visible }: { target: Element; visible: boolean }): void {
    if (!this.projAnimationPlayed && visible && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      anime({
        targets: '.anime-profile-proj',
        translateX: ['-100%', 0], // Move from left (-100%) to current position (0)
        opacity: [0, 1], // Fade from transparent (0) to opaque (1)
        easing: 'easeInOutQuad', // Use easing for smoother animation
        delay: 0,
        duration: 1000 // Animation duration in milliseconds
      });
      this.projAnimationPlayed = true;
    }
  }

  onEduIntersection({ target, visible }: { target: Element; visible: boolean }): void {
    if (!this.eduAnimationPlayed && visible && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      anime({
        targets: '.anime-profile-edu',
        translateX: ['-100%', 0], // Move from left (-100%) to current position (0)
        opacity: [0, 1], // Fade from transparent (0) to opaque (1)
        easing: 'easeInOutQuad', // Use easing for smoother animation
        delay: 0,
        duration: 1000 // Animation duration in milliseconds
      });
      this.eduAnimationPlayed = true;
    }
  }

}
