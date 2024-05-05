import { Directive, HostListener, Renderer2, ElementRef } from '@angular/core';

@Directive({
    standalone: true,
    selector: '[scrollSlideFade]'
})
export class ScrollSlideFadeDirective {
    private lastScrollTop = 0;

    constructor(private renderer: Renderer2, private el: ElementRef) { }

    @HostListener('window:scroll', [])
    onWindowScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
        var header = document.querySelector('.profile-header-container');

        // Check the scroll direction
        const scrollDirection = scrollTop > this.lastScrollTop ? 'down' : 'up';

        // Apply slide and fade effects only for vertical scrolling
        if (Math.abs(scrollTop - this.lastScrollTop) > 5) { // adjust this value based on your needs
            if (scrollDirection === 'down') {
                // Scrolling down
                this.renderer.setStyle(this.el.nativeElement, 'top', '-62px');
                if (window.innerWidth < 911) {
                    this.renderer.setStyle(header, 'paddingTop', '70px');
                }
            } else {
                // Scrolling up
                this.renderer.setStyle(this.el.nativeElement, 'top', '0');
                if (window.innerWidth < 911) {
                    this.renderer.removeStyle(header, 'paddingTop');
                }
            }
            this.lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
        }
    }
}