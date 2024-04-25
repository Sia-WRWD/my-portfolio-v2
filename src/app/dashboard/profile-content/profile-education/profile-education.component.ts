import { Component, ElementRef } from '@angular/core';
import { InViewportModule } from 'ng-in-viewport';

@Component({
  selector: 'app-profile-education',
  standalone: true,
  imports: [InViewportModule],
  templateUrl: './profile-education.component.html',
  styleUrl: './profile-education.component.scss'
})
export class ProfileEducationComponent {
  animationPlayed: boolean = false;

  constructor(private el: ElementRef) { }

  removeAnimationInlineStyles() {
    // setTimeout(() => {
    //   const carouselElement = document.querySelectorAll('.profile-workexp-content-carousel');
    //   carouselElement.forEach(element => {
    //     element.removeAttribute('style');
    //   });

    //   const filterElements = document.querySelectorAll('.carousel-filter-icon-container');
    //   filterElements.forEach(element => {
    //     element.removeAttribute('style');
    //   });
    // }, 5000)
  }

  onIntersection({ target, visible }: { target: Element; visible: boolean }): void {

    if (this.animationPlayed == false && visible && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {

    //     anime({
    //       targets: '.profile-workexp-content-carousel',
    //       translateX: ['100%', 0], // Move from left (-100%) to current position (0)
    //       opacity: [0, 1], // Fade from transparent (0) to opaque (1)
    //       delay: 2000, // Use easing for smoother animation
    //     });

    //     anime({
    //       targets: '.carousel-filter-icon-container',
    //       translateX: ['-1000px', 0], // Move from left (-100%) to current position (0)
    //       opacity: [0, 1], // Fade from transparent (0) to opaque (1)
    //       delay: anime.stagger(200, { start: 2250 }), // Use easing for smoother animation
    //     });

    //   this.removeAnimationInlineStyles();
    //   this.animationPlayed = true;
    }
  }
}
