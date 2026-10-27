import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { activities } from '../../shared/data/activity';
import { rightContent } from '../../shared/data/right-content';
import { ScrollReachedDirective } from 'src/app/dashboard/shared/directives/scroll-reaches.directive';
import anime from 'animejs/lib/anime.es.js';
import { NzTooltipModule } from 'ng-zorro-antd/tooltip';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { IntroService } from '../../shared/service/intro.service';

// Each block's slot in the post-intro sequence (ms), landing just after the sidebar panel itself.
const REVEAL_SLOTS = {
  status: 400,
  achievements: 500,
  groups: 600,
  games: 700,
  friends: 800
};

@Component({
  selector: 'app-right-content',
  standalone: true,
  imports: [CommonModule, ScrollReachedDirective, NzTooltipModule, FontAwesomeModule],
  templateUrl: './right-content.component.html',
  styleUrls: ['./right-content.component.scss', './friend-mini-profile.scss']
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

  constructor(library: FaIconLibrary, private intro: IntroService) {
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

  prefersReducedMotion(): boolean {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  // Animated items sit inside hover popovers' stacking contexts, so leftover transforms must go.
  clearTransforms(anim: any) {
    anim.animatables.forEach((animatable: any) => animatable.target.style.removeProperty('transform'));
  }

  revealTitle(selector: string, delay: number) {
    anime({
      targets: selector,
      translateX: [-40, 0],
      opacity: [0, 1],
      easing: 'easeOutCubic',
      delay,
      duration: 550,
      complete: (anim: any) => this.clearTransforms(anim)
    });
  }

  onStatusReached() {
    if (!this.statusAnimationPlayed && !this.prefersReducedMotion()) {
      this.revealTitle('.anime-status', this.intro.delayFor(REVEAL_SLOTS.status));
      this.statusAnimationPlayed = true;
    }
  }

  onAchievementsReached() {
    if (!this.achievementsAnimationPlayed && !this.prefersReducedMotion()) {
      const delay = this.intro.delayFor(REVEAL_SLOTS.achievements);
      this.revealTitle('.anime-achievements', delay);

      anime({
        targets: '.achievement-logo',
        scale: [0.5, 1],
        opacity: [0, 1],
        easing: 'easeOutBack',
        duration: 450,
        delay: anime.stagger(60, { start: delay + 150 }),
        complete: (anim: any) => this.clearTransforms(anim)
      });

      this.achievementsAnimationPlayed = true;
    }
  }

  onGroupsReached() {
    if (!this.groupsAnimationPlayed && !this.prefersReducedMotion()) {
      const delay = this.intro.delayFor(REVEAL_SLOTS.groups);
      this.revealTitle('.anime-groups', delay);

      anime({
        targets: '.groups-main-pic',
        scale: [0.6, 1],
        opacity: [0, 1],
        easing: 'easeOutBack',
        duration: 450,
        delay: anime.stagger(90, { start: delay + 150 }),
        complete: (anim: any) => this.clearTransforms(anim)
      });

      anime({
        targets: '.groups-main-info',
        translateX: [30, 0],
        opacity: [0, 1],
        easing: 'easeOutCubic',
        duration: 500,
        delay: anime.stagger(90, { start: delay + 200 }),
        complete: (anim: any) => this.clearTransforms(anim)
      });

      this.groupsAnimationPlayed = true;
    }
  }

  onGamesReached() {
    if (!this.gamesAnimationPlayed && !this.prefersReducedMotion()) {
      const delay = this.intro.delayFor(REVEAL_SLOTS.games);
      this.revealTitle('.anime-games', delay);

      anime({
        targets: '.game-container',
        translateY: [30, 0],
        opacity: [0, 1],
        easing: 'easeOutCubic',
        duration: 500,
        delay: anime.stagger(80, { start: delay + 150 }),
        complete: (anim: any) => this.clearTransforms(anim)
      });

      this.gamesAnimationPlayed = true;
    }
  }

  onFriendsReached() {
    if (!this.friendsAnimationPlayed && !this.prefersReducedMotion()) {
      const delay = this.intro.delayFor(REVEAL_SLOTS.friends);
      this.revealTitle('.anime-friends', delay);

      anime({
        targets: '.highlighted-friends-container',
        translateY: [24, 0],
        opacity: [0, 1],
        easing: 'easeOutCubic',
        duration: 500,
        delay: anime.stagger(70, { start: delay + 150 }),
        complete: (anim: any) => this.clearTransforms(anim)
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
