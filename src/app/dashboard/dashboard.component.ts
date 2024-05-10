import { Component } from '@angular/core';
import { NavigationComponent } from './navigation/navigation.component';
import { ProfileHeaderComponent } from './profile-header/profile-header.component';
import { LoaderComponent } from './loader/loader.component';
import { ProfileContentComponent } from './profile-content/profile-content.component';
import { FooterComponent } from './footer/footer.component';
import anime from 'animejs/lib/anime.es.js';
import { ScrollReachedDirective } from './shared/directives/scroll-reaches.directive';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NavigationComponent, ProfileHeaderComponent, LoaderComponent, ProfileContentComponent, FooterComponent, ScrollReachedDirective],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  currentTime: any = "";
  footerAnimationPlayed: boolean = false;

  constructor() { }

  ngOnInit() {
    this.getCurrentTime();
  }

  onFooterIntersection() {
    if (!this.footerAnimationPlayed && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      anime({
        targets: '.profile-footer',
        translateX: ['-100%', 0], // Move from left (-100%) to current position (0)
        opacity: [0, 1], // Fade from transparent (0) to opaque (1)
        easing: 'easeInOutQuad', // Use easing for smoother animation
        delay: 0,
        duration: 1000 // Animation duration in milliseconds
      });
      this.footerAnimationPlayed = true;
    }
  }

  getCurrentTime() {
    const now = new Date();
    const hours = now.getHours();

    if (hours >= 9 && hours < 18) { //working-time
      this.currentTime = 'work-time';
    } else if (hours >= 18 && hours < 9) { //off-work
      this.currentTime = 'off-time';
    }
  }

}


