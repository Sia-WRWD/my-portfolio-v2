import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
    standalone: true,
    selector: '[myToolTip]'
})
export class TooltipDirective {

    constructor(private elRef: ElementRef, private renderer: Renderer2) { }
    @Input('tooltipContent') tooltipContent: string = '';
    @Input('tooltipOffset') tooltipOffset: number = 0; //For every new line (put 15px)
    @Input('tooltipDirection') tooltipDirection: string = 'left'; //For every new line (put 15px)
    @Input('tooltipSpecial') tooltipSpecial: boolean = false;

    createTooltip() {
        const tooltip = this.renderer.createElement('div');
        const text = this.renderer.createText(this.tooltipContent);
        this.renderer.appendChild(tooltip, text);
        this.renderer.addClass(tooltip, 'toolTipMy');
        this.renderer.setStyle(tooltip, 'position', 'absolute');

        // Set innerHTML to render HTML content
        tooltip.innerHTML = this.tooltipContent;

        return tooltip;
    }

    @HostListener('mouseenter', ['$event'])
    @HostListener('touchstart', ['$event'])
    onMouseEnter(event: MouseEvent | TouchEvent) {
        event.preventDefault(); // Prevent default touch events behavior
        const myTooltip = this.createTooltip();

        const hostRect = this.elRef.nativeElement.getBoundingClientRect();

        if (this.tooltipDirection == "left") {
            const left = hostRect.left;
            this.renderer.setStyle(myTooltip, 'left', left + 'px');
        } else if (this.tooltipDirection == "right") {
            const right = window.innerWidth - hostRect.right;
            this.renderer.setStyle(myTooltip, 'right', right + 'px');
        }
        let top = hostRect.top - hostRect.height - this.tooltipOffset; // Adjust top position by subtracting host element's height

        // Adjust top position based on viewport height
        if (window.innerHeight - hostRect.top < hostRect.height + 10) {
            top = hostRect.top + hostRect.height + this.tooltipOffset;
        }

        this.renderer.setStyle(myTooltip, 'top', top + 'px');

        document.body.appendChild(myTooltip);
    }

    @HostListener('mouseleave', ['$event'])
    @HostListener('touchend', ['$event'])
    onMouseLeave(event: MouseEvent | TouchEvent) {
        const tooltip = document.body.querySelector('.toolTipMy'); // Query within document body
        if (tooltip) {
            this.renderer.removeChild(document.body, tooltip); // Remove from document body
        }
    }
}
