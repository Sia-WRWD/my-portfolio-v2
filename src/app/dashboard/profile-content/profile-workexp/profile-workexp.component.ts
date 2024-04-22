import { Component } from '@angular/core';
import anime from 'animejs/lib/anime.es.js';
import { InViewportDirective } from 'ng-in-viewport';
import { CarouselModule } from 'ngx-acuw';

@Component({
  selector: 'app-profile-workexp',
  standalone: true,
  imports: [InViewportDirective, CarouselModule],
  templateUrl: './profile-workexp.component.html',
  styleUrl: './profile-workexp.component.scss'
})
export class ProfileWorkexpComponent {
  animationPlayed: boolean = false;

  workExpCarouselItems = [
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzYrRIui75mIjWZ8L4n4HFAiujNkWTztPxqOQ0Z12Oqw&s',
    'https://www.fusionexus.com/wp-content/uploads/2018/11/IMG-fxlg.jpg',
    'https://media.licdn.com/dms/image/C560BAQFOcJlUTD1hCw/company-logo_200_200/0/1630670422579/whalecloud_logo?e=2147483647&v=beta&t=UgKf0016oAmJfBPtu2nM6utCmTSmTuDfnBt5wpw1kaQ',
    'https://www.fusionexus.com/wp-content/uploads/2018/11/IMG-fxlg.jpg'
  ];

  onIntersection({ target, visible }: { target: Element; visible: boolean }): void {

    if (this.animationPlayed == false && visible && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      anime({
        targets: '.profile-workexp-header-filter',
        translateX: ['800px', 0], // Move from left (-100%) to current position (0)
        opacity: [0, 1], // Fade from transparent (0) to opaque (1)
        delay: anime.stagger(200, { start: 1000 }), // Use easing for smoother animation
      });

      this.animationPlayed = true;
    }
  }
}
