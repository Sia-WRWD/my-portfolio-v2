import { Component } from '@angular/core';
import { stacks } from '../../shared/data/stack-data';
import anime from 'animejs/lib/anime.es.js';

@Component({
  selector: 'app-profile-stacks',
  standalone: true,
  imports: [],
  templateUrl: './profile-stacks.component.html',
  styleUrl: './profile-stacks.component.scss'
})
export class ProfileStacksComponent {
  filters: any = [
    { name: "All", state: "Active", shorthand: "All" },
    { name: "Web Dev", state: "Inactive", shorthand: "WebDev" },
    { name: "AI Model Dev", state: "Inactive", shorthand: "AIModelDev" },
    { name: "Database", state: "Inactive", shorthand: "Database" }
  ]
  filteredStacks: any = [];
  hoveredStack: any = [];
  animationPlayed: boolean = false;

  ngOnInit() {
    this.filteredStacks = stacks;
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.playStackAnimation();
    }, 1000)
  }

  changeStack(filterValue: string) {
    // Update the state of the filters array
    this.filters.forEach((filter: any) => {
      filter.state = filter.shorthand === filterValue ? "Active" : "Inactive";
    });

    stacks.forEach((category: any) => {
      category.languages.forEach((language: any) => {
        language.opacity = 'unselected';
      });
    });

    if (filterValue == "All") {
      // If 'All' is selected, set opacity of all languages to 'selected'
      stacks.forEach((category: any) => {
        category.languages.forEach((language: any) => {
          language.opacity = 'selected';
        });
      });
    } else {
      // Filter the stacks array based on the shorthand
      const filteredCategory = stacks.find((stack: any) => stack.shorthand === filterValue);

      // Set opacity of languages in the filtered category to 'selected'
      filteredCategory.languages.forEach((language: any) => {
        language.opacity = 'selected';
      });
    }
  }

  removeAnimationInlineStyles() {
    setTimeout(() => {
      const filterElements = document.querySelectorAll('.profile-stack-header-filter');
      filterElements.forEach(element => {
        element.removeAttribute('style');
      });

      // const stackElements = document.querySelectorAll('.profile-stack-icon-container');
      // stackElements.forEach(element => {
      //   element.removeAttribute('style');
      // });
    }, 5000)
  }

  playStackAnimation() {

    if (this.animationPlayed == false && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      anime({
        targets: '.profile-stack-header-filter',
        translateX: ['800px', 0], // Move from left (-100%) to current position (0)
        opacity: [0, 1], // Fade from transparent (0) to opaque (1)
        delay: anime.stagger(200, { start: 500 }), // Use easing for smoother animation
      });

      anime({
        targets: '.profile-stack-icon-container',
        translateY: ['500px', 0], // Move from left (-100%) to current position (0)
        delay: anime.stagger(150, { start: 500 }), // Use easing for smoother animation
      });

      this.removeAnimationInlineStyles();
      this.animationPlayed = true;
    }
  }
}
