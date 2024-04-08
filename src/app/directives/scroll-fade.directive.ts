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

        if (scrollTop > this.lastScrollTop) {
            // Scrolling down
            this.renderer.setStyle(this.el.nativeElement, 'opacity', '0');
        } else {
            // Scrolling up
            this.renderer.setStyle(this.el.nativeElement, 'opacity', '1');
        }
        this.lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
    }
}