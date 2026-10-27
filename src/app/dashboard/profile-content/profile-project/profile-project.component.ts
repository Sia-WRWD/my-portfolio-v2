import { Component, ElementRef } from '@angular/core';
import VanillaTilt from 'vanilla-tilt';
import anime from 'animejs/lib/anime.es.js';
import { projects } from '../../shared/data/project';

@Component({
  selector: 'app-profile-project',
  standalone: true,
  imports: [],
  templateUrl: './profile-project.component.html',
  styleUrl: './profile-project.component.scss'
})
export class ProfileProjectComponent {

  animationPlayed: boolean = false;
  selectedProjects: any = projects;

  constructor(private el: ElementRef) { }

  ngAfterViewInit() {
    if (this.shouldApplyTilt() && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      VanillaTilt.init(
        this.el.nativeElement.querySelectorAll('.tilt-object'),
        { max: 6, speed: 400, scale: 1.02, glare: true, 'max-glare': 0.15 }
      );
    }
  }

  shouldApplyTilt() {
    const mobileScreenWidth = 910;
    return window.innerWidth > mobileScreenWidth;
  }

  playIntro(startDelay: number): void {
    if (this.animationPlayed == false && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      anime({
        targets: this.el.nativeElement.querySelectorAll('.project-capsule'),
        opacity: [0, 1],
        translateY: [40, 0],
        easing: 'easeOutCubic',
        duration: 600,
        delay: anime.stagger(90, { start: startDelay }),
        // VanillaTilt owns the transform from here on.
        complete: (anim: any) => anim.animatables.forEach((a: any) => a.target.style.removeProperty('transform'))
      });

      this.animationPlayed = true;
    }
  }
}
