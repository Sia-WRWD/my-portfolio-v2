import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { activities } from '../../shared/data/activity';
import { rightContent } from '../../shared/data/right-content';
import { ScrollReachedDirective } from 'src/app/dashboard/shared/directives/scroll-reaches.directive';
import anime from 'animejs/lib/anime.es.js';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-right-content',
  standalone: true,
  imports: [CommonModule, ScrollReachedDirective, NzToolTipModule, FontAwesomeModule],
  templateUrl: './right-content.component.html',
  styleUrl: './right-content.component.scss'
})
export class RightContentComponent {
  @ViewChild('achievementShowcase') achievementShowcase!: ElementRef;

  statusAnimationPlayed: boolean = false;
  achievementsAnimationPlayed: boolean = false;
  groupsAnimationPlayed: boolean = false;
  gamesAnimationPlayed: boolean = false;
  friendsAnimationPlayed: boolean = false;

  status: string = "Offline";
  statusColor: string = "";
  activities: any = activities;
  rightContent: any = rightContent;
  achievementsLength: number = 0;
  groupsLength: number = 0;
  gamesLength: number = 49;
  friendsLength: number = 420;

  constructor(library: FaIconLibrary) {
    library.addIcons(
      faUpRightFromSquare
    )
  }

  ngOnInit() {
    this.statusUpdate();
    this.friendStatusUpdate();
    this.setVariablesLength();
  }

  ngAfterViewInit() {
    this.onInitAnimation();

    if (window.innerWidth > 910) {
      this.desktopAchievementHorizontalScroll();
    }
  }

  setVariablesLength() {
    this.achievementsLength = this.rightContent.find((content: any) => 'achievements' in content)?.achievements.length || 0;
    this.groupsLength = this.rightContent.find((content: any) => 'groups' in content)?.groups.length || 0;
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
    this.onAchievementsReached();
    this.onGroupsReached();

    if (window.innerWidth <= 910) {
      this.onResponsiveGamesReached();
      this.onResponsiveFriendsReached();
    } else if (window.innerWidth > 910 && window.innerHeight > 754) {
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

  onAchievementsReached() {
    if (!this.achievementsAnimationPlayed && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      anime({
        targets: '.anime-achievements',
        translateX: ['-100%', 0], // Move from left (-100%) to current position (0)
        opacity: [0, 1], // Fade from transparent (0) to opaque (1)
        easing: 'easeInOutQuad', // Use easing for smoother animation
        delay: 1300,
        duration: 1000 // Animation duration in milliseconds
      });

      anime({
        targets: '.achievement-logo',
        opacity: [0, 1], // Fade from transparent (0) to opaque (1)
        delay: anime.stagger(300, { start: 1600 }), // Use easing for smoother animation
      });

      this.achievementsAnimationPlayed = true;
    }
  }

  onGroupsReached() {
    if (!this.groupsAnimationPlayed && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      anime({
        targets: '.anime-groups',
        translateX: ['-100%', 0], // Move from left (-100%) to current position (0)
        opacity: [0, 1], // Fade from transparent (0) to opaque (1)
        easing: 'easeInOutQuad', // Use easing for smoother animation
        delay: 1600,
        duration: 1000 // Animation duration in milliseconds
      });

      anime({
        targets: '.groups-main-pic',
        opacity: [0, 1], // Fade from transparent (0) to opaque (1)
        delay: anime.stagger(300, { start: 2200 }), // Use easing for smoother animation
      });

      anime({
        targets: '.groups-main-info',
        translateX: ['100%', 0],
        opacity: [0, 1], // Fade from transparent (0) to opaque (1)
        delay: anime.stagger(300, { start: 2300 }), // Use easing for smoother animation
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


        anime({
          targets: '.game-container',
          translateX: ['100%', 0],
          opacity: [0, 1], // Fade from transparent (0) to opaque (1)
          easing: 'easeInOutQuad',
          delay: anime.stagger(300, { start: 0 }), // Use easing for smoother animation
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
        delay: 3600,
        duration: 1000 // Animation duration in milliseconds
      });

      anime({
        targets: '.game-container',
        translateY: ['-100%', 0], // Move from left (-100%) to current position (0)
        opacity: [0, 1], // Fade from transparent (0) to opaque (1)
        easing: 'easeInOutQuad', // Use easing for smoother animation
        delay: anime.stagger(300, { start: 3700 }),
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

        anime({
          targets: '.highlighted-friends-container',
          translateY: ['100%', 0],
          opacity: [0, 1], // Fade from transparent (0) to opaque (1)
          delay: anime.stagger(300, { start: 500 }), // Use easing for smoother animation
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
        delay: 2900,
        duration: 1000 // Animation duration in milliseconds
      });

      anime({
        targets: '.highlighted-friends-container',
        translateY: ['100%', 0], // Move from left (-100%) to current position (0)
        opacity: [0, 1], // Fade from transparent (0) to opaque (1)
        easing: 'easeInOutQuad', // Use easing for smoother animation
        delay: anime.stagger(300, { start: 3000 }),
      });

      this.friendsAnimationPlayed = true;
    }
  }

  desktopAchievementHorizontalScroll() {
    const showcase = this.achievementShowcase.nativeElement as HTMLElement;

    showcase.addEventListener('wheel', (event) => {
      event.preventDefault();
      const scrollAmount = event.deltaY; // Reduce scroll speed by a factor of 0.2
      showcase.scrollLeft += scrollAmount;
    });
  }
}
