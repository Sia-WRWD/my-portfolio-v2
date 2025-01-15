import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { ScrollReachedDirective } from 'src/app/dashboard/shared/directives/scroll-reaches.directive';
import VanillaTilt from 'vanilla-tilt';
import anime from 'animejs/lib/anime.es.js';
import { projects } from '../../shared/data/project';

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

  ngAfterViewInit() {
    if (this.shouldApplyTilt() && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      VanillaTilt.init(
        this.el.nativeElement.querySelectorAll('.tilt-object'),
        { max: 30, speed: 100, scale: 1.1 }
      );
    }
  }

  shouldApplyTilt() {
    const mobileScreenWidth = 910;
    return window.innerWidth > mobileScreenWidth;
  }

  removeAnimationInlineStyles() {
    setTimeout(() => {
      const projElements = document.querySelectorAll('.profile-project-card');
      projElements.forEach(element => {
        element.removeAttribute('style');
      });
    }, 2000)
  }

  onIntersection(): void {

    if (this.animationPlayed == false && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      anime({
        targets: '.profile-project-card',
        opacity: [0, 1],
        scale: [0, 1],
        delay: anime.stagger(200, { start: 500 })
      });

      this.removeAnimationInlineStyles();
      this.animationPlayed = true;
    }
  }

  //To apply effects on Project Card Bg when user enters Project Card Content.
  onMouseEnter(index: number) {
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const projectCardBgElement = this.projectCardBgElements.toArray()[index]?.nativeElement;
      if (projectCardBgElement) {
        projectCardBgElement.classList.add('project-card-bg-hovered');
      }
    }
  }

  onMouseLeave(index: number) {
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const projectCardBgElement = this.projectCardBgElements.toArray()[index]?.nativeElement;
      if (projectCardBgElement) {
        projectCardBgElement.classList.remove('project-card-bg-hovered');
      }
    }
  }
}
