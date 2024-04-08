import { Component } from '@angular/core';
import anime from 'animejs/lib/anime.es.js';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent {

  isChecked: boolean = false;
  options: any = [
    { name: "Stack", anchor: "stack" },
    { name: "Education", anchor: "education" },
    { name: "Projects", anchor: "projects" },
    { name: "Work-Exp", anchor: "Contact" },
    { name: "Resume", anchor: "Contact" }
  ]

  constructor() {

  }

  handleCheckboxChange(event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      this.staggerOptions();
    } else {
      const elements = document.querySelectorAll('.responsive-header-menu-option');
      elements.forEach(element => {
        element.removeAttribute('style');
      });
    }
  }

  staggerOptions() {
    anime({
      targets: '.responsive-header-menu-option',
      translateX: 270,
      delay: anime.stagger(100, { start: 500 }) // delay starts at 500ms then increase by 100ms for each elements.
    });
  }
}
