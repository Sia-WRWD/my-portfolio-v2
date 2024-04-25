import { Component, ElementRef } from '@angular/core';
import anime from 'animejs/lib/anime.es.js';
import { projects } from '../../shared/data/project';
import { ScrollReachedDirective } from 'src/app/directives/scroll-reaches.directive';

@Component({
  selector: 'app-profile-project',
  standalone: true,
  imports: [ScrollReachedDirective],
  templateUrl: './profile-project.component.html',
  styleUrl: './profile-project.component.scss'
})
export class ProfileProjectComponent {
  animationPlayed: boolean = false;
  selectedProjects: any = projects;

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

  onIntersection(): void {

    if (this.animationPlayed == false && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {

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
