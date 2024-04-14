import { Directive, HostListener, Renderer2, ElementRef } from '@angular/core';

@Directive({
    standalone: true,
    selector: '[scrollSpy]'
})
export class ScrollSpyDirective {

    constructor(private renderer: Renderer2, private el: ElementRef) { }

    @HostListener('window:scroll', [])
    onWindowScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
        var header = document.querySelector('.profile-header-container');

        if (scrollTop > 0) {
            this.renderer.addClass(this.el.nativeElement, 'scroll-down-fixed');
            this.renderer.setStyle(header, "paddingTop", "119px");
        } else {
            this.renderer.removeClass(this.el.nativeElement, 'scroll-down-fixed');
            this.renderer.setStyle(header, "paddingTop", "0px");
        }
    }
}