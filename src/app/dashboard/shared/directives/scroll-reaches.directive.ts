import { AfterViewInit, Directive, ElementRef, EventEmitter, OnDestroy, Output, inject } from '@angular/core';
import { Subscription, take } from 'rxjs';
import { IntroService } from '../service/intro.service';

// Emits once, when the top of the element scrolls into the lower 85% of the viewport.
@Directive({
    standalone: true,
    selector: '[scrollReached]'
})
export class ScrollReachedDirective implements AfterViewInit, OnDestroy {
    @Output() scrollReached = new EventEmitter<void>();

    private elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
    private intro = inject(IntroService, { optional: true });
    private observer?: IntersectionObserver;
    private introSubscription?: Subscription;

    ngAfterViewInit(): void {
        if (this.intro) {
            this.introSubscription = this.intro.done$.pipe(take(1)).subscribe(() => this.observe());
        } else {
            this.observe();
        }
    }

    private observe(): void {
        // The huge top margin also counts elements already scrolled past (e.g. after a nav jump),
        // so a section never stays hidden just because it was skipped over.
        this.observer = new IntersectionObserver(entries => {
            if (entries.some(entry => entry.isIntersecting)) {
                this.observer?.disconnect();
                this.scrollReached.emit();
            }
        }, { rootMargin: '100000px 0px -15% 0px' });

        this.observer.observe(this.elementRef.nativeElement);
    }

    ngOnDestroy(): void {
        this.introSubscription?.unsubscribe();
        this.observer?.disconnect();
    }
}
