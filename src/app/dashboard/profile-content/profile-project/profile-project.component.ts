import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import anime from 'animejs/lib/anime.es.js';
import { projects } from '../../shared/data/project';
import { ScrollReachedDirective } from 'src/app/directives/scroll-reaches.directive';

@Component({
  selector: 'app-profile-project',
  standalone: true,
  imports: [ScrollReachedDirective],
  templateUrl: './profile-project.component.html',
  styleUrl: './profile-project.component.scss'
})
export class ProfileProjectComponent {

  @ViewChildren('projectCardContent') projectCardContentElements!: QueryList<ElementRef>;
  @ViewChildren('projectCardBg') projectCardBgElements!: QueryList<ElementRef>;
  animationPlayed: boolean = false;
  selectedProjects: any = projects;

  constructor(private el: ElementRef) { }

  removeAnimationInlineStyles() {
    // setTimeout(() => {
    //   const carouselElement = document.querySelectorAll('.profile-workexp-content-carousel');
    //   carouselElement.forEach(element => {
    //     element.removeAttribute('style');
    //   });

    //   const filterElements = document.querySelectorAll('.carousel-filter-icon-container');
    //   filterElements.forEach(element => {
    //     element.removeAttribute('style');
    //   });
    // }, 5000)
  }

  onIntersection(): void {

    if (this.animationPlayed == false && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      
    }
  }

  //To apply effects on Project Card Bg when user enters Project Card Content.
  onMouseEnter(index: number) {
    const projectCardBgElement = this.projectCardBgElements.toArray()[index]?.nativeElement;
    if (projectCardBgElement) {
      projectCardBgElement.classList.add('project-card-bg-hovered');
    }
  }

  onMouseLeave(index: number) {
    const projectCardBgElement = this.projectCardBgElements.toArray()[index]?.nativeElement;
    if (projectCardBgElement) {
      projectCardBgElement.classList.remove('project-card-bg-hovered');
    }
  }
}
