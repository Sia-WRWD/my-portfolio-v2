import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import anime from 'animejs/lib/anime.es.js';
import { ScrollFadeDirective } from 'src/app/directives/scroll-fade.directive';
import { ScrollSlideFadeDirective } from 'src/app/directives/scroll-slide-fade.directive';
import { ScrollSpyDirective } from 'src/app/directives/scroll-spy.directive';
import { ScrollService } from '../shared/service/scroll.service';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [ScrollSpyDirective, ScrollFadeDirective, ScrollSlideFadeDirective, FontAwesomeModule, CommonModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent {

  @ViewChild('stacksSection') test!: ElementRef;

  isChecked: boolean = false;
  options: any = [
    { name: "STACKS", anchor: "stacks", icon: "" },
    { name: "WORK-EXP", anchor: "workexp", icon: "" },
    { name: "PROJECTS", anchor: "project", icon: "" },
    { name: "EDUCATION", anchor: "edu", icon: "" },
    { name: "CONTACT", anchor: "contact", icon: "" },
    { name: "RESUME", anchor: "resume", icon: "" }
  ]

  constructor(private scrollService: ScrollService) {
    
  }

  handleCheckboxChange(event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      this.staggerOptions();
      this.toggleBodyOverflow(true);
    } else {
      const elements = document.querySelectorAll('.responsive-header-menu-option');
      elements.forEach(element => {
        element.removeAttribute('style');
      });
      this.toggleBodyOverflow(false);
    }
  }

  staggerOptions() {
    anime({
      targets: '.responsive-header-menu-option-container',
      translateX: ['500px', '0px'], //from value, destination value.
      delay: anime.stagger(250, { start: 500 }) // delay starts at 500ms then increase by 100ms for each elements.
    });
  }

  toggleBodyOverflow(hide: boolean) {
    const body = document.querySelector('body');

    if (hide == true) {
      body!.style.overflow = "hidden";
    } else {
      body!.removeAttribute('style');
    }
  }

  scrollToSection(sectionId: string) {
    this.scrollService.scrollToSection(sectionId);
  }
}
