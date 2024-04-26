import { Directive, ElementRef, EventEmitter, Output, HostListener } from '@angular/core';

@Directive({
    standalone: true,
    selector: '[navScrollReached]'
})
export class ScrollReachedNavDirective {
    @Output() navScrollReached = new EventEmitter<void>();

    constructor(private elementRef: ElementRef) { }

    @HostListener('window:scroll', [])
    onScroll(): void {
        const element = this.elementRef.nativeElement;
        const elementRect = element.getBoundingClientRect();
        const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

        // Check if the top and bottom of the element section are within the viewport
        if (elementRect.top >= 0 && elementRect.bottom <= viewportHeight) {
            this.navScrollReached.emit();
        }
    }
}
