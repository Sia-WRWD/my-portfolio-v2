import { Component, ElementRef, HostListener, Renderer2 } from '@angular/core';
import { ScrollReachedDirective } from 'src/app/directives/scroll-reaches.directive';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import { Observable, debounceTime, fromEvent, map } from 'rxjs';
import { edu } from '../../shared/data/edu';
import anime from 'animejs/lib/anime.es.js';
import { faAward, faBuildingColumns, faChevronDown, faChevronUp, faClipboardCheck } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-profile-education',
  standalone: true,
  imports: [ScrollReachedDirective, CommonModule, FontAwesomeModule],
  templateUrl: './profile-education.component.html',
  styleUrl: './profile-education.component.scss'
})
export class ProfileEducationComponent {
  animationPlayed: boolean = false;
  selectedEdu: any = edu;
  private isAnimating: boolean = false;
  private currentItemIndex: number = 0;

  constructor(private el: ElementRef, private renderer: Renderer2, library: FaIconLibrary) {
    library.addIcons(
      faChevronUp,
      faChevronDown,
      faClipboardCheck,
      faAward,
      faBuildingColumns
    )
  }

  //Mobile Nav Scroll
  scrollToNext() {
    const container = this.el.nativeElement.querySelector('.profile-edu-content-display');
    const itemHeight = container.querySelector('.edu-timeline-content').offsetHeight;
    const nextIndex = this.currentItemIndex + 1;
    const nextScrollTop = nextIndex * itemHeight;

    if (nextIndex < this.selectedEdu.length) { // Check if next index is within bounds
      this.animateScroll(container, container.scrollTop, nextScrollTop, 300); // Adjust the duration as needed
      this.currentItemIndex = nextIndex;
    }
  }

  scrollToPrevious() {
    const container = this.el.nativeElement.querySelector('.profile-edu-content-display');
    const itemHeight = container.querySelector('.edu-timeline-content').offsetHeight;
    const previousIndex = this.currentItemIndex - 1;
    const previousScrollTop = previousIndex * itemHeight;

    if (previousIndex >= 0) { // Check if previous index is within bounds
      this.animateScroll(container, container.scrollTop, previousScrollTop, 300); // Adjust the duration as needed
      this.currentItemIndex = previousIndex;
    }
  }

  //Desktop Scroll
  @HostListener('wheel', ['$event'])
  onWheel(event: WheelEvent) {
    event.preventDefault(); // Prevent default scrolling behavior

    if (this.isAnimating) {
      return; // Do nothing if animation is already in progress
    }

    const container = this.el.nativeElement.querySelector('.profile-edu-content-display');
    const items = container.querySelectorAll('.edu-timeline-content');
    const itemHeight = items[0].offsetHeight;
    const containerHeight = container.offsetHeight;

    const deltaY = event.deltaY;

    if (deltaY > 0) {
      // Scroll down
      this.animateScroll(container, container.scrollTop, container.scrollTop + itemHeight, 300); // Adjust the duration as needed
    } else if (deltaY < 0) {
      // Scroll up
      this.animateScroll(container, container.scrollTop, container.scrollTop - itemHeight, 300); // Adjust the duration as needed
    }
  }

  animateScroll(element: HTMLElement, start: number, end: number, duration: number) {
    this.isAnimating = true;

    const startTime = performance.now();
    const distance = end - start;
    const self = this;

    function step(timestamp: number) {
      const progress = Math.min((timestamp - startTime) / duration, 1);
      element.scrollTop = start + distance * progress;

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        self.isAnimating = false; // Reset animation flag when animation is completed
      }
    }

    window.requestAnimationFrame(step);
  }

  ngAfterViewInit() {
    // Education Content Display Max-Height Observable.
    const eduTimelineContent = this.el.nativeElement.querySelector('.edu-timeline-content');
    const profileEduContentDisplay = this.el.nativeElement.querySelector('.profile-edu-content-display');

    if (eduTimelineContent && profileEduContentDisplay) {
      // Adjust max-height immediately during initialization
      const initialHeight = eduTimelineContent.offsetHeight;
      const initialMaxHeight = initialHeight;
      this.renderer.setStyle(profileEduContentDisplay, 'max-height', `${initialMaxHeight}px`);

      // Create an Observable to observe changes in the height of the .edu-timeline-content element
      const heightChanges$: Observable<number> = fromEvent(window, 'resize').pipe(
        map(() => eduTimelineContent.offsetHeight)
      );

      // Subscribe to the Observable to update the max-height of the .profile-edu-content-display element
      heightChanges$.subscribe(height => {
        const newMaxHeight = height;
        this.renderer.setStyle(profileEduContentDisplay, 'max-height', `${newMaxHeight}px`);
      });

      // Manually trigger window resize event when Chrome DevTools resize event is detected
      fromEvent(window, 'resize').pipe(
        debounceTime(100) // Adjust debounce time as needed
      ).subscribe(() => {
        window.dispatchEvent(new Event('resize'));
      });
    }
  }


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

      anime({
        targets: '.edu-date',
        translateX: ['-100%', 0], // Move from left (-100%) to current position (0)
        opacity: [0, 1], // Fade from transparent (0) to opaque (1)
        delay: 1000, // Use easing for smoother animation
      });

      anime({
        targets: '.edu-card',
        translateY: ['1000px', 0],
        opacity: [0, 1], // Fade from transparent (0) to opaque (1)
        delay: anime.stagger(200, { start: 1200 }), // Use easing for smoother animation
      });

      this.removeAnimationInlineStyles();
      this.animationPlayed = true;
    }
  }
}
