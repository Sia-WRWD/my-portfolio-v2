import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ScrollService {
    scrollToSection(sectionId: string) {
        const section = document.getElementById(sectionId);
        const headerOffset = 110;
        var sectionPosition = section!.getBoundingClientRect().top;
        var offsetPosition = sectionPosition + window.pageYOffset - headerOffset;

        if (section) {

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    }
}
