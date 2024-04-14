import { Component } from '@angular/core';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import anime from 'animejs/lib/anime.es.js';
import { ScrollFadeDirective } from 'src/app/directives/scroll-fade.directive';
import { ScrollSlideFadeDirective } from 'src/app/directives/scroll-slide-fade.directive';
import { ScrollSpyDirective } from 'src/app/directives/scroll-spy.directive';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [ScrollSpyDirective, ScrollFadeDirective, ScrollSlideFadeDirective, FontAwesomeModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent {

  isChecked: boolean = false;
  options: any = [
    { name: "Stacks", anchor: "stack", icon: "" },
    { name: "Work-Exp", anchor: "work-exp", icon: "" },
    { name: "Projects", anchor: "projects", icon: "" },
    { name: "Education", anchor: "education", icon: "" },
    { name: "Contact", anchor: "contact", icon: "" },
    { name: "Resume", anchor: "", icon: "" }
  ]

  constructor() {
    
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
}
