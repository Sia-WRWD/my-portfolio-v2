import { Component } from '@angular/core';
import anime from 'animejs/lib/anime.es.js';
import { InViewportDirective } from 'ng-in-viewport';

@Component({
  selector: 'app-profile-workexp',
  standalone: true,
  imports: [InViewportDirective],
  templateUrl: './profile-workexp.component.html',
  styleUrl: './profile-workexp.component.scss'
})
export class ProfileWorkexpComponent {
  animationPlayed: boolean = false;

  onIntersection({ target, visible }: { target: Element; visible: boolean }): void {
    console.log("test:" + this.animationPlayed);

    if (this.animationPlayed == false && visible && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      anime({
        targets: '.profile-workexp-header-filter',
        translateX: ['800px', 0], // Move from left (-100%) to current position (0)
        opacity: [0, 1], // Fade from transparent (0) to opaque (1)
        delay: anime.stagger(200, { start: 1000 }), // Use easing for smoother animation
      });

      this.animationPlayed = true;
      console.log(this.animationPlayed);
    }
  }
}
