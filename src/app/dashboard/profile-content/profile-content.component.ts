import { Component, ElementRef, ViewChild } from '@angular/core';
import anime from 'animejs/lib/anime.es.js';
import { ProfileStacksComponent } from './profile-stacks/profile-stacks.component';
import { ProfileEducationComponent } from './profile-education/profile-education.component';
import { ProfileProjectComponent } from './profile-project/profile-project.component';
import { ProfileWorkexpComponent } from './profile-workexp/profile-workexp.component';
import { ProfileContactComponent } from './profile-contact/profile-contact.component';
import { InViewportModule } from 'ng-in-viewport';
import { ScrollReachedDirective } from 'src/app/directives/scroll-reaches.directive';

@Component({
  selector: 'app-profile-content',
  standalone: true,
  imports: [
    ProfileStacksComponent, ProfileEducationComponent, ProfileProjectComponent, 
    ProfileWorkexpComponent, ProfileContactComponent, InViewportModule, ScrollReachedDirective
  ],
  templateUrl: './profile-content.component.html',
  styleUrl: './profile-content.component.scss'
})
export class ProfileContentComponent {

  stacksAnimationPlayed: boolean = false;
  workexpAnimationPlayed: boolean = false;
  projAnimationPlayed: boolean = false;
  eduAnimationPlayed: boolean = false;

  ngOnInit() {

  }

  onScrollReached(): void {
    // Perform actions when the scroll reaches the element section
    console.log('Scroll reached the element section');
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

  onWorkExpIntersection(): void {
    if (!this.workexpAnimationPlayed && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      anime({
        targets: '.anime-profile-workexp',
        translateX: ['100%', 0], // Move from left (-100%) to current position (0)
        opacity: [0, 1], // Fade from transparent (0) to opaque (1)
        easing: 'easeInOutQuad', // Use easing for smoother animation
        delay: 0,
        duration: 1000 // Animation duration in milliseconds
      });
      this.workexpAnimationPlayed = true;
    }
  }

  onProjIntersection(): void {
    if (!this.projAnimationPlayed && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      anime({
        targets: '.anime-profile-project',
        translateX: ['-100%', 0], // Move from left (-100%) to current position (0)
        opacity: [0, 1], // Fade from transparent (0) to opaque (1)
        easing: 'easeInOutQuad', // Use easing for smoother animation
        delay: 0,
        duration: 1000 // Animation duration in milliseconds
      });
      this.projAnimationPlayed = true;
    }
  }

  onEduIntersection(): void {
    if (!this.eduAnimationPlayed && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
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

  onNavScrollReached(section: string) {

  }
}
