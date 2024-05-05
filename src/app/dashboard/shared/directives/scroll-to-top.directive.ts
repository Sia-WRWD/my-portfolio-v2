import { Directive, HostListener, ElementRef, Renderer2 } from '@angular/core';

@Directive({
    standalone: true,
    selector: '[scrollToTop]'
})
export class ScrollToTopDirective {
    private isVisible = false;

    constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

    @HostListener('window:scroll', [])
    onWindowScroll() {
        const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
        const windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 0;
        const triggerHeight = 0.25 * windowHeight;

        if (scrollPosition > triggerHeight && !this.isVisible) {
            this.renderer.setStyle(this.elementRef.nativeElement, 'display', 'flex');
            this.isVisible = true;
        } else if (scrollPosition <= triggerHeight && this.isVisible) {
            this.renderer.setStyle(this.elementRef.nativeElement, 'display', 'none');
            this.isVisible = false;
        }
    }

    @HostListener('click')
    onClick() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}
