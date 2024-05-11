import { Component, ElementRef, ViewChild } from '@angular/core';
import anime from 'animejs/lib/anime.es.js';
import { NzCarouselFlipStrategy, NzCarouselModule, NZ_CAROUSEL_CUSTOM_STRATEGIES } from 'ng-zorro-antd/carousel';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { workExp } from '../../shared/data/work-exp';
import { ScrollReachedDirective } from 'src/app/dashboard/shared/directives/scroll-reaches.directive';

@Component({
  selector: 'app-profile-workexp',
  standalone: true,
  imports: [NzCarouselModule, CommonModule, ScrollReachedDirective, NgOptimizedImage],
  templateUrl: './profile-workexp.component.html',
  styleUrl: './profile-workexp.component.scss',
  providers: [
    {
      provide: NZ_CAROUSEL_CUSTOM_STRATEGIES,
      useValue: [
        { name: 'flip', strategy: NzCarouselFlipStrategy }
      ]
    }
  ]
})
export class ProfileWorkexpComponent {
  animationPlayed: boolean = false;
  workExpSlides: any = workExp;
  strategy = 'flip';

  constructor(private el: ElementRef) { }

  ngAfterViewInit() {
    this.resizeCarouselDescObserver();
  }

  removeAnimationInlineStyles() {
    setTimeout(() => {
      const carouselElement = document.querySelectorAll<HTMLDivElement>('.profile-workexp-content-carousel');
      carouselElement.forEach(element => {
        element.removeAttribute('style');
        element.style.opacity = '1';
      });

      const filterElements = document.querySelectorAll('.carousel-filter-icon-container');
      filterElements.forEach(element => {
        element.removeAttribute('style');
      });
    }, 3000)
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
          delay: 900, // Use easing for smoother animation
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

  // slideTo(index: number) {
  //   const bulletsContainer = document.querySelector('.bullets-container');
  //   const bulletElements = bulletsContainer!.querySelectorAll('.bullet');

  //   bulletElements.forEach((bullet, idx) => {
  //     // Assert bullet as HTMLElement
  //     const bulletElement = bullet as HTMLElement;

  //     // Check if the index matches the desired index
  //     if (idx == index) {
  //       // Trigger the click event for the bullet element at the specified index
  //       bulletElement.click();
  //       console.log(idx);
  //     }
  //   });

  //   this.workExpSlides.forEach((slide: any, idx: any) => {
  //     // If the index matches the desired index
  //     if (idx == index) {
  //       // Set the selected property to 'active'
  //       slide.selected = 'active';
  //     } else {
  //       // Set the selected property to 'inactive' for all other slides
  //       slide.selected = 'inactive';
  //     }
  //   });
  // }

  resizeCarouselDescObserver() {
    // Select the first slide's content element
    const firstSlideContent = document.querySelector('.profile-workexp-content-carousel-slide:nth-child(1) .slide-card-desc-desc');
  
    // Check if ResizeObserver is supported by the browser
    if ('ResizeObserver' in window) {
      // Create a new ResizeObserver
      const resizeObserver = new ResizeObserver(entries => {
        // Get the first entry (which corresponds to the first slide's content)
        const firstEntry = entries[0];
        
        // Get the height of the first slide's content
        const firstSlideHeight = firstEntry.contentRect.height;
  
        // Apply the height to the other slides' content
        const otherSlides = document.querySelectorAll('.carousel-slide:nth-child(n+2) .slide-card-desc-desc');
        otherSlides.forEach((slide: any) => {
          slide.style.height = firstSlideHeight + 'px';
        });
      });
  
      // Observe changes in the size of the first slide's content
      resizeObserver.observe(firstSlideContent!);
    } else {
      // Fallback for browsers that do not support ResizeObserver
      console.error('ResizeObserver is not supported');
    }
  }
}
