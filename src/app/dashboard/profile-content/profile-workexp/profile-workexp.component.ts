import { Component, ElementRef, ViewChild } from '@angular/core';
import anime from 'animejs/lib/anime.es.js';
import { CarouselModule } from 'ngx-carousel-ease';
import { CommonModule } from '@angular/common';
import { workExp } from '../../shared/data/work-exp';
import { ScrollReachedDirective } from 'src/app/directives/scroll-reaches.directive';

@Component({
  selector: 'app-profile-workexp',
  standalone: true,
  imports: [CarouselModule, CommonModule, ScrollReachedDirective],
  templateUrl: './profile-workexp.component.html',
  styleUrl: './profile-workexp.component.scss'
})
export class ProfileWorkexpComponent {
  animationPlayed: boolean = false;
  workExpSlides: any = workExp;

  constructor(private el: ElementRef) { }

  ngAfterViewInit() {

  }

  removeAnimationInlineStyles() {
    setTimeout(() => {
      const carouselElement = document.querySelectorAll('.profile-workexp-content-carousel');
      carouselElement.forEach(element => {
        element.removeAttribute('style');
      });

      const filterElements = document.querySelectorAll('.carousel-filter-icon-container');
      filterElements.forEach(element => {
        element.removeAttribute('style');
      });
    }, 5000)
  }

  onIntersection(): void {

    if (this.animationPlayed == false && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {

      if (window.innerWidth > 768) {
        anime({
          targets: '.profile-workexp-content-carousel',
          translateX: ['100%', 0], // Move from left (-100%) to current position (0)
          opacity: [0, 1], // Fade from transparent (0) to opaque (1)
          delay: 500, // Use easing for smoother animation
        });

        anime({
          targets: '.carousel-filter-icon-container',
          translateX: ['-1000px', 0], // Move from left (-100%) to current position (0)
          opacity: [0, 1], // Fade from transparent (0) to opaque (1)
          delay: anime.stagger(200, { start: 700 }), // Use easing for smoother animation
        });

        this.removeAnimationInlineStyles();
        this.animationPlayed = true;
      } else {
        anime({
          targets: '.carousel-filter-icon-container',
          translateX: ['1000px', 0], // Move from left (-100%) to current position (0)
          opacity: [0, 1], // Fade from transparent (0) to opaque (1)
          delay: anime.stagger(200, { start: 500 }), // Use easing for smoother animation
        });

        anime({
          targets: '.profile-workexp-content-carousel',
          translateX: ['100%', 0], // Move from left (-100%) to current position (0)
          opacity: [0, 1], // Fade from transparent (0) to opaque (1)
          delay: 700, // Use easing for smoother animation
        });

        this.removeAnimationInlineStyles();
        this.animationPlayed = true;
      }
    }
  }

  shouldApplyTilt(): boolean {
    // Adjust the screen width threshold based on your definition of "mobile"
    const mobileScreenWidth = 910;
    return window.innerWidth > mobileScreenWidth;
  }

  slideTo(index: number) {
    const bulletsContainer = document.querySelector('.bullets-container');
    const bulletElements = bulletsContainer!.querySelectorAll('.bullet');

    bulletElements.forEach((bullet, idx) => {
      // Assert bullet as HTMLElement
      const bulletElement = bullet as HTMLElement;

      // Check if the index matches the desired index
      if (idx == index) {
        // Trigger the click event for the bullet element at the specified index
        bulletElement.click();
      }
    });

    this.workExpSlides.forEach((slide: any, idx: any) => {
      // If the index matches the desired index
      if (idx == index) {
        // Set the selected property to 'active'
        slide.selected = 'active';
      } else {
        // Set the selected property to 'inactive' for all other slides
        slide.selected = 'inactive';
      }
    });
  }
}
