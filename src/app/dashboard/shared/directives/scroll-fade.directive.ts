import { Directive, HostListener, Renderer2, ElementRef } from '@angular/core';

@Directive({
    standalone: true,
    selector: '[scrollFade]'
})
export class ScrollFadeDirective {
    private lastScrollTop = 0;

    constructor(private renderer: Renderer2, private el: ElementRef) { }

    @HostListener('window:scroll', [])
    onWindowScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

        // Check the scroll direction
        const scrollDirection = scrollTop > this.lastScrollTop ? 'down' : 'up';

        // Apply fade effect only for vertical scrolling
        if (Math.abs(scrollTop - this.lastScrollTop) > 5) { // adjust this value based on your needs
            if (scrollDirection === 'down') {
                // Scrolling down
                this.renderer.setStyle(this.el.nativeElement, 'opacity', '0');
                this.renderer.setStyle(this.el.nativeElement, 'z-index', '-1');
            } else {
                // Scrolling up
                this.renderer.setStyle(this.el.nativeElement, 'opacity', '1');
                this.renderer.setStyle(this.el.nativeElement, 'z-index', '9999');
            }
            this.lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
        }
    }
}