import { Component, DestroyRef, ElementRef, Renderer2 } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import anime from 'animejs/lib/anime.es.js';
import { NzCarouselFlipStrategy, NzCarouselModule, NZ_CAROUSEL_CUSTOM_STRATEGIES } from 'ng-zorro-antd/carousel';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { debounceTime, fromEvent } from 'rxjs';
import { workExp } from '../../shared/data/work-exp';

@Component({
  selector: 'app-profile-workexp',
  standalone: true,
  imports: [NzCarouselModule, CommonModule, NgOptimizedImage],
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
  workExpSlides: any[] = workExp.map((slide: any) => ({ ...slide, ...this.getPlaytime(slide) }));
  totalRecordLabel: string = this.formatRecord(this.countDistinctMonths(workExp));
  strategy = 'flip';

  constructor(private el: ElementRef, private renderer: Renderer2, private destroyRef: DestroyRef) { }

  // Steam-style "x hrs on record", counted in whole months with both ends inclusive.
  getPlaytime(slide: any): { months: number, recordLabel: string, isCurrent: boolean } {
    const isCurrent = slide.endDate === 'Now';
    const { start, end } = this.getRange(slide);
    const months = end - start + 1;

    return { months, recordLabel: this.formatRecord(months), isCurrent };
  }

  // Back-to-back roles share their handover month, so the total counts each month only once.
  countDistinctMonths(slides: any[]): number {
    const months = new Set<number>();
    slides.forEach(slide => {
      const { start, end } = this.getRange(slide);
      for (let month = start; month <= end; month++) {
        months.add(month);
      }
    });
    return months.size;
  }

  // Start and end as absolute month numbers (year * 12 + month).
  getRange(slide: any): { start: number, end: number } {
    const now = new Date();
    const start = this.parseMonth(slide.startDate);
    const end = slide.endDate === 'Now' ? now.getFullYear() * 12 + now.getMonth() : this.parseMonth(slide.endDate);
    return { start, end };
  }

  // Accepts labels like "Jan 2024", "Sept 2022" or "April 2026".
  parseMonth(label: string): number {
    const [month, year] = label.split(' ');
    const monthIndex = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec']
      .indexOf(month.slice(0, 3).toLowerCase());
    return Number(year) * 12 + monthIndex;
  }

  formatRecord(months: number): string {
    return months < 12 ? `${months} mos` : `${(months / 12).toFixed(1)} yrs`;
  }

  ngAfterViewInit() {
    this.syncDescHeights();

    fromEvent(window, 'resize').pipe(
      debounceTime(100),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(() => this.syncDescHeights());
  }

  // Every description takes the tallest one's height so the carousel doesn't jump between slides.
  syncDescHeights() {
    const descs: HTMLElement[] = Array.from(this.el.nativeElement.querySelectorAll('.slide-card-desc-desc'));

    if (descs.length === 0) {
      return;
    }

    descs.forEach(desc => this.renderer.removeStyle(desc, 'height'));
    const tallest = Math.max(...descs.map(desc => desc.offsetHeight));
    descs.forEach(desc => this.renderer.setStyle(desc, 'height', `${tallest}px`));
  }

  playIntro(startDelay: number): void {
    if (this.animationPlayed == false && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const carousel = this.el.nativeElement.querySelector('.profile-workexp-content-carousel');

      anime({
        targets: carousel,
        translateY: [30, 0],
        opacity: [0, 1],
        easing: 'easeOutCubic',
        duration: 600,
        delay: startDelay,
        complete: () => carousel.style.removeProperty('transform')
      });

      anime({
        targets: this.el.nativeElement.querySelectorAll('.workexp-capsule'),
        scale: [0.6, 1],
        rotate: [-12, 0],
        easing: 'easeOutBack',
        duration: 600,
        delay: startDelay + 200,
        complete: (anim: any) => anim.animatables.forEach((a: any) => a.target.style.removeProperty('transform'))
      });

      this.animationPlayed = true;
    }
  }
}
