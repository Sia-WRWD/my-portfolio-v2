import { Component, ViewChild, ElementRef } from '@angular/core';
import { stacks } from '../../shared/data/stack-data';
import anime from 'animejs/lib/anime.es.js';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-profile-stacks',
  standalone: true,
  imports: [NzToolTipModule, NgOptimizedImage],
  templateUrl: './profile-stacks.component.html',
  styleUrl: './profile-stacks.component.scss'
})
export class ProfileStacksComponent {
  @ViewChild('filterRef') filterRef!: ElementRef;
  filters: any = [
    { name: "All", state: "Active", shorthand: "All" },
    { name: "Web Dev", state: "Inactive", shorthand: "WebDev" },
    { name: "AI Model Dev", state: "Inactive", shorthand: "AIModelDev" },
    { name: "Database", state: "Inactive", shorthand: "Database" }
  ];
  filteredStacks: any = [];
  animationPlayed: boolean = false;

  ngOnInit() {
    this.filteredStacks = stacks;
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.playStackAnimation();
    }, 1000)
  }

  trackByFilter(index: number, filter: any): string {
    return filter.shorthand;
  }

  trackByStack(index: number, stack: any): number {
    return index;
  }

  trackByLanguage(index: number, language: any): number {
    return index;
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
      const filterElements = this.filterRef.nativeElement.querySelectorAll('.profile-stack-header-filter');
      filterElements.forEach((element: any) => {
        element.removeAttribute('style');
      });

      // const stackElements = document.querySelectorAll('.profile-stack-icon-container');
      // stackElements.forEach(element => {
      //   element.removeAttribute('style');
      // });
    }, 5000)
  }

  playStackAnimation() {
    // Your animation logic here
  }
}
