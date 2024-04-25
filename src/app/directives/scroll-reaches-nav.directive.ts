import { Directive, ElementRef, EventEmitter, Output, HostListener, Renderer2 } from '@angular/core';

@Directive({
    standalone: true,
    selector: '[navScrollReached]'
})
export class ScrollReachedDirective {
    @Output() scrollReached = new EventEmitter<void>();

    constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

    @HostListener('window:scroll', [])
    onScroll(): void {
        const element = this.elementRef.nativeElement;
        const elementRect = element.getBoundingClientRect();
        const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

        // Calculate the threshold as a percentage of the viewport height
        const threshold = 0; // Change this value as needed
        const thresholdOffset = viewportHeight * threshold;

        // Check if the top of the element section is within the threshold
        if (elementRect.top <= thresholdOffset) {
            this.scrollReached.emit();
        }
    }
}
