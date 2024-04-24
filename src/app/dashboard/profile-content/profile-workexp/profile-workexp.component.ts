import { Component, ElementRef, ViewChild } from '@angular/core';
import anime from 'animejs/lib/anime.es.js';
import { InViewportDirective } from 'ng-in-viewport';
import { CarouselModule } from 'ngx-carousel-ease';
import VanillaTilt from 'vanilla-tilt';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { workExp } from '../../shared/data/work-exp';

@Component({
  selector: 'app-profile-workexp',
  standalone: true,
  imports: [InViewportDirective, CarouselModule, NgOptimizedImage, CommonModule],
  templateUrl: './profile-workexp.component.html',
  styleUrl: './profile-workexp.component.scss'
})
export class ProfileWorkexpComponent {
  animationPlayed: boolean = false;
  workExpSlides: any = workExp;

  constructor(private el: ElementRef) { }

  ngAfterViewInit() {
    if (this.shouldApplyTilt() && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      VanillaTilt.init(
        this.el.nativeElement.querySelectorAll('.tilt-object'),
        { max: 30, speed: 100, scale: 1.1 }
      );
    }
  }

  onIntersection({ target, visible }: { target: Element; visible: boolean }): void {

    if (this.animationPlayed == false && visible && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      anime({
        targets: '.profile-workexp-header-filter',
        translateX: ['800px', 0], // Move from left (-100%) to current position (0)
        opacity: [0, 1], // Fade from transparent (0) to opaque (1)
        delay: anime.stagger(200, { start: 1000 }), // Use easing for smoother animation
      });

      this.animationPlayed = true;
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
