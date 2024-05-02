import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { activities } from '../../shared/data/activity';
import { rightContent } from '../../shared/data/right-content';
import { ScrollReachedDirective } from 'src/app/directives/scroll-reaches.directive';
import anime from 'animejs/lib/anime.es.js';

@Component({
  selector: 'app-right-content',
  standalone: true,
  imports: [CommonModule, ScrollReachedDirective],
  templateUrl: './right-content.component.html',
  styleUrl: './right-content.component.scss'
})
export class RightContentComponent {
  statusAnimationPlayed: boolean = false;
  hackathonsAnimationPlayed: boolean = false;
  groupsAnimationPlayed: boolean = false;
  gamesAnimationPlayed: boolean = false;
  friendsAnimationPlayed: boolean = false;

  status: string = "Offline";
  statusColor: string = "";
  activities: any = activities;
  rightContent: any = rightContent;

  ngOnInit() {
    this.statusUpdate();
    this.friendStatusUpdate();
    this.onInitAnimation();
  }

  statusUpdate() {
    const currentDate = new Date();
    const currentHour = currentDate.getHours();

    let statusObj = { status: 'Lost in Coding', statusColor: '#898989' };

    activities.forEach((interval: any) => {
      if (currentHour >= interval.start && currentHour < interval.end) {
        statusObj = { status: interval.status, statusColor: interval.statusColor };
      }
    });

    this.status = statusObj.status;
    this.statusColor = statusObj.statusColor;
  }

  friendStatusUpdate() {
    // Iterate through the friends array and randomize the status
    this.rightContent.forEach((section: any) => {
      if (section.friends) {
        section.friends.forEach((friend: any) => {
          friend.status = this.getRandomStatus(); // Assign a random status
        });
      }
    });
  }

  getRandomStatus(): string {
    const statuses = ['Offline', 'Online', 'In-Game'];
    const randomIndex = Math.floor(Math.random() * statuses.length);
    return statuses[randomIndex];
  }

  onInitAnimation() {
    this.onStatusReached();
    this.onHackathonReached();
    this.onGroupsReached();

    if (window.innerWidth <= 910) {
      this.onResponsiveGamesReached();
      this.onResponsiveFriendsReached();
    }
  }

  onStatusReached() {
    if (!this.statusAnimationPlayed && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      anime({
        targets: '.anime-status',
        translateX: ['-100%', 0], // Move from left (-100%) to current position (0)
        opacity: [0, 1], // Fade from transparent (0) to opaque (1)
        easing: 'easeInOutQuad', // Use easing for smoother animation
        delay: 1200,
        duration: 1000 // Animation duration in milliseconds
      });
      this.statusAnimationPlayed = true;
    }
  }

  onHackathonReached() {
    if (!this.hackathonsAnimationPlayed && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      anime({
        targets: '.anime-hackathons',
        translateX: ['-100%', 0], // Move from left (-100%) to current position (0)
        opacity: [0, 1], // Fade from transparent (0) to opaque (1)
        easing: 'easeInOutQuad', // Use easing for smoother animation
        delay: 1300,
        duration: 1000 // Animation duration in milliseconds
      });
      this.hackathonsAnimationPlayed = true;
    }
  }

  onGroupsReached() {
    if (!this.groupsAnimationPlayed && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      anime({
        targets: '.anime-groups',
        translateX: ['-100%', 0], // Move from left (-100%) to current position (0)
        opacity: [0, 1], // Fade from transparent (0) to opaque (1)
        easing: 'easeInOutQuad', // Use easing for smoother animation
        delay: 1400,
        duration: 1000 // Animation duration in milliseconds
      });
      this.groupsAnimationPlayed = true;
    }
  }

  onGamesReached() {
    if (!this.gamesAnimationPlayed && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {

      if (window.innerWidth > 910) {
        anime({
          targets: '.anime-games',
          translateX: ['-100%', 0], // Move from left (-100%) to current position (0)
          opacity: [0, 1], // Fade from transparent (0) to opaque (1)
          easing: 'easeInOutQuad', // Use easing for smoother animation
          delay: 0,
          duration: 1000 // Animation duration in milliseconds
        });
        this.gamesAnimationPlayed = true;
      }
    }
  }

  onResponsiveGamesReached() {
    if (!this.gamesAnimationPlayed && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      anime({
        targets: '.anime-games',
        translateX: ['-100%', 0], // Move from left (-100%) to current position (0)
        opacity: [0, 1], // Fade from transparent (0) to opaque (1)
        easing: 'easeInOutQuad', // Use easing for smoother animation
        delay: 1900,
        duration: 1000 // Animation duration in milliseconds
      });
      this.gamesAnimationPlayed = true;
    }
  }

  onFriendsReached() {
    if (!this.friendsAnimationPlayed && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {

      if (window.innerWidth > 910) {
        anime({
          targets: '.anime-friends',
          translateX: ['-100%', 0], // Move from left (-100%) to current position (0)
          opacity: [0, 1], // Fade from transparent (0) to opaque (1)
          easing: 'easeInOutQuad', // Use easing for smoother animation
          delay: 0,
          duration: 1000 // Animation duration in milliseconds
        });
        this.friendsAnimationPlayed = true;
      }
    }
  }

  onResponsiveFriendsReached() {
    if (!this.friendsAnimationPlayed && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {

      anime({
        targets: '.anime-friends',
        translateX: ['-100%', 0], // Move from left (-100%) to current position (0)
        opacity: [0, 1], // Fade from transparent (0) to opaque (1)
        easing: 'easeInOutQuad', // Use easing for smoother animation
        delay: 1700,
        duration: 1000 // Animation duration in milliseconds
      });
      this.friendsAnimationPlayed = true;
    }
  }
}
