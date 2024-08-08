import { Component, ElementRef, Renderer2 } from '@angular/core';
import anime from 'animejs/lib/anime.es.js';
import { ProfileStacksComponent } from './profile-stacks/profile-stacks.component';
import { ProfileEducationComponent } from './profile-education/profile-education.component';
import { ProfileProjectComponent } from './profile-project/profile-project.component';
import { ProfileWorkexpComponent } from './profile-workexp/profile-workexp.component';
import { ProfileContactComponent } from './profile-contact/profile-contact.component';
import { RightContentComponent } from './right-content/right-content.component';
import { InViewportModule } from 'ng-in-viewport';
import { CommonModule } from '@angular/common';
import { ScrollReachedDirective } from 'src/app/dashboard/shared/directives/scroll-reaches.directive';
import { ScrollReachedNavDirective } from 'src/app/dashboard/shared/directives/scroll-reaches-nav.directive';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChevronUp, faImage, faImages, faPhone, faXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-profile-content',
  standalone: true,
  imports: [
    ProfileStacksComponent, ProfileEducationComponent, ProfileProjectComponent,
    ProfileWorkexpComponent, ProfileContactComponent, InViewportModule, ScrollReachedDirective, ScrollReachedNavDirective,
    CommonModule, RightContentComponent, FontAwesomeModule
  ],
  templateUrl: './profile-content.component.html',
  styleUrl: './profile-content.component.scss'
})
export class ProfileContentComponent {

  stacksAnimationPlayed: boolean = false;
  workexpAnimationPlayed: boolean = false;
  projAnimationPlayed: boolean = false;
  eduAnimationPlayed: boolean = false;
  rightContentAnimationPlayed: boolean = false;
  isModalVisible: boolean = false;
  isProfileContentVisible: boolean = false;

  constructor(private library: FaIconLibrary) {
    library.addIcons(
      faPhone,
      faXmark,
      faChevronUp,
      faImages,
      faImage
    )
  }

  ngOninit() {

  }

  ngAfterViewInit() {
    
  }

  onStacksIntersection({ target, visible }: { target: Element; visible: boolean }): void {
    if (this.stacksAnimationPlayed == false && visible && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {

      var delay = 0;

      if (window.innerWidth > 910) {
        delay = 500
      } else {
        delay = 1000
      }

      anime({
        targets: '.anime-profile-stacks',
        translateX: ['-100%', 0], // Move from left (-100%) to current position (0)
        opacity: [0, 1], // Fade from transparent (0) to opaque (1)
        easing: 'easeInOutQuad', // Use easing for smoother animation
        delay: delay,
        duration: 1000, // Animation duration in milliseconds
        loop: false
      });

      this.stacksAnimationPlayed = true;
    }
  }

  onWorkExpIntersection(): void {
    if (!this.workexpAnimationPlayed && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      var delay = 0;

      if (window.innerWidth < 910) {
        delay = 1000
      } else {
        delay = 0
      }

      anime({
        targets: '.anime-profile-workexp',
        translateX: ['100%', 0], // Move from left (-100%) to current position (0)
        opacity: [0, 1], // Fade from transparent (0) to opaque (1)
        easing: 'easeInOutQuad', // Use easing for smoother animation
        delay: delay,
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
        translateX: ['100%', 0], // Move from left (-100%) to current position (0)
        opacity: [0, 1], // Fade from transparent (0) to opaque (1)
        easing: 'easeInOutQuad', // Use easing for smoother animation
        delay: 0,
        duration: 1000 // Animation duration in milliseconds
      });
      this.eduAnimationPlayed = true;
    }
  }

  onNavScrollReached(section: string) {
    // Remove the "header-menuitem-active" class from all elements
    const allSections = document.querySelectorAll('.header-menuitem-active');
    allSections.forEach((element) => {
      element.classList.remove('header-menuitem-active');
    });

    // Add the "header-menuitem-active" class to the newly reached section
    const sectionReached = document.querySelector(`.${section}`);
    sectionReached?.classList.add('header-menuitem-active');
  }

  onRightContentIntersection({ target, visible }: { target: Element; visible: boolean }): void {
    if (this.rightContentAnimationPlayed == false && visible && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {

      if (window.innerWidth > 910) {
        anime({
          targets: '.right-profile-content-container',
          translateY: ['100%', 0], // Move from left (-100%) to current position (0)
          opacity: [0, 1], // Fade from transparent (0) to opaque (1)
          easing: 'easeInOutQuad', // Use easing for smoother animation
          delay: 750,
          duration: 1000, // Animation duration in milliseconds
          loop: false
        });
        this.rightContentAnimationPlayed = true;
      } else {
        anime({
          targets: '.right-profile-content-container',
          translateX: ['100%', 0], // Move from left (-100%) to current position (0)
          opacity: [0, 1], // Fade from transparent (0) to opaque (1)
          easing: 'easeInOutQuad', // Use easing for smoother animation
          delay: 500,
          duration: 1000, // Animation duration in milliseconds
          loop: false
        });
        this.rightContentAnimationPlayed = true;
      }
    }
  }
}
