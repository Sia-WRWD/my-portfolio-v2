import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
    standalone: true,
    selector: '[myToolTip]'
})

export class tooltipDirective {

    constructor(private elRef: ElementRef, private renderer: Renderer2) { }
    @Input('myToolTip') tooltipContent: string = '';

    createTooltip() {
        const tooltip = this.renderer.createElement('div');
        const text = this.renderer.createText(this.tooltipContent);
        this.renderer.appendChild(tooltip, text);
        this.renderer.addClass(tooltip, 'toolTipMy');
        this.renderer.setStyle(tooltip, 'position', 'absolute');
        return tooltip;
    }

    @HostListener('mouseover')
    onMouseOver() {
        const myTooltip = this.createTooltip();
        this.renderer.appendChild(this.elRef.nativeElement, myTooltip);
    }

    @HostListener('mouseout')
    onMouseOut() {
        const tooltip = this.elRef.nativeElement.querySelector('.toolTipMy');
        this.renderer.removeChild(this.elRef.nativeElement, tooltip);
    }

}