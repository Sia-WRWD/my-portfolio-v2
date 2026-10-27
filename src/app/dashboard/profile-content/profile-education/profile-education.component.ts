import { Component, DestroyRef, ElementRef, HostListener, Renderer2 } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import { debounceTime, fromEvent } from 'rxjs';
import { edu } from '../../shared/data/edu';
import anime from 'animejs/lib/anime.es.js';
import { faAward, faBuildingColumns, faChevronDown, faChevronUp, faClipboardCheck, faGraduationCap, faSchool } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-profile-education',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './profile-education.component.html',
  styleUrl: './profile-education.component.scss'
})
export class ProfileEducationComponent {
  animationPlayed: boolean = false;
  selectedEdu: any = edu;
  currentItemIndex: number = 0;
  private isAnimating: boolean = false;

  constructor(private el: ElementRef, private renderer: Renderer2, private destroyRef: DestroyRef, library: FaIconLibrary) {
    library.addIcons(
      faChevronUp,
      faChevronDown,
      faClipboardCheck,
      faAward,
      faBuildingColumns,
      faGraduationCap,
      faSchool
    )
  }

  scrollToNext() {
    this.goTo(this.currentItemIndex + 1);
  }

  scrollToPrevious() {
    this.goTo(this.currentItemIndex - 1);
  }

  goTo(index: number) {
    if (this.isAnimating || index < 0 || index >= this.selectedEdu.length) {
      return;
    }

    const container = this.getContainer();
    const itemHeight = container.querySelector<HTMLElement>('.edu-timeline-content')!.offsetHeight;

    this.animateScroll(container, container.scrollTop, index * itemHeight, 300);
    this.currentItemIndex = index;
  }

  // Wheel steps one item at a time, but hands scrolling back to the page at either end of the list.
  @HostListener('wheel', ['$event'])
  onWheel(event: WheelEvent) {
    if (!(event.target as HTMLElement).closest('.profile-edu-content-display') || event.deltaY === 0) {
      return;
    }

    const target = this.currentItemIndex + (event.deltaY > 0 ? 1 : -1);

    if (target < 0 || target >= this.selectedEdu.length) {
      return;
    }

    event.preventDefault();
    this.goTo(target);
  }

  animateScroll(element: HTMLElement, start: number, end: number, duration: number) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      element.scrollTop = end;
      return;
    }

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
    this.syncItemHeights();

    fromEvent(window, 'resize').pipe(
      debounceTime(100),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(() => this.syncItemHeights());
  }

  // Every item takes the tallest item's height so each scroll step lands exactly on the next item.
  syncItemHeights() {
    const container = this.getContainer();
    const items: HTMLElement[] = Array.from(container?.querySelectorAll('.edu-timeline-content') ?? []);

    if (!container || items.length === 0) {
      return;
    }

    items.forEach(item => this.renderer.removeStyle(item, 'height'));
    const tallest = Math.max(...items.map(item => item.offsetHeight));

    items.forEach(item => this.renderer.setStyle(item, 'height', `${tallest}px`));
    this.renderer.setStyle(container, 'max-height', `${tallest}px`);
    container.scrollTop = this.currentItemIndex * tallest;
  }

  getContainer(): HTMLElement {
    return this.el.nativeElement.querySelector('.profile-edu-content-display');
  }

  playIntro(startDelay: number): void {
    if (this.animationPlayed == false && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {

      anime({
        targets: this.el.nativeElement.querySelectorAll('.edu-card'),
        translateY: [40, 0],
        opacity: [0, 1],
        easing: 'easeOutCubic',
        duration: 600,
        delay: startDelay,
        complete: (anim: any) => anim.animatables.forEach((a: any) => a.target.style.removeProperty('transform'))
      });

      anime({
        targets: this.el.nativeElement.querySelectorAll('.edu-badge'),
        scale: [0.6, 1],
        rotate: [-10, 0],
        easing: 'easeOutBack',
        duration: 600,
        delay: startDelay + 200,
        complete: (anim: any) => anim.animatables.forEach((a: any) => a.target.style.removeProperty('transform'))
      });

      // Nav pills keep their disabled opacity in CSS, so hand both properties back once they land.
      anime({
        targets: this.el.nativeElement.querySelectorAll('.edu-mobile-nav'),
        translateX: [20, 0],
        opacity: [0, 1],
        easing: 'easeOutCubic',
        duration: 450,
        delay: anime.stagger(80, { start: startDelay + 100 }),
        complete: (anim: any) => anim.animatables.forEach((a: any) => a.target.removeAttribute('style'))
      });

      this.animationPlayed = true;
    }
  }
}
