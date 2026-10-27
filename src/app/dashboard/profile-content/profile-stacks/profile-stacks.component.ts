import { Component } from '@angular/core';
import { stacks } from '../../shared/data/stack-data';
import anime from 'animejs/lib/anime.es.js';
import { NzTooltipModule } from 'ng-zorro-antd/tooltip';

@Component({
  selector: 'app-profile-stacks',
  standalone: true,
  imports: [NzTooltipModule],
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
  animationPlayed: boolean = false;

  ngOnInit() {
    this.filteredStacks = stacks;
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

  playIntro(startDelay: number) {
    if (this.animationPlayed == false && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      anime({
        targets: '.profile-stack-header-filter',
        translateX: [40, 0],
        opacity: [0, 1],
        easing: 'easeOutCubic',
        duration: 500,
        delay: anime.stagger(70, { start: startDelay }),
        complete: (anim: any) => this.clearInlineStyles(anim)
      });

      anime({
        targets: '.profile-stack-icon-container',
        translateY: [30, 0],
        scale: [0.85, 1],
        opacity: [0, 1],
        easing: 'easeOutBack',
        duration: 500,
        delay: anime.stagger(35, { start: startDelay + 150 }),
        complete: (anim: any) => this.clearInlineStyles(anim)
      });

      this.animationPlayed = true;
    }
  }

  // Hand opacity and transform back to the stylesheet so the filter dimming and hover effects keep working.
  clearInlineStyles(anim: any) {
    anim.animatables.forEach((animatable: any) => {
      animatable.target.style.removeProperty('transform');
      animatable.target.style.removeProperty('opacity');
    });
  }
}