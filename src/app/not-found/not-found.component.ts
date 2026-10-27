import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTriangleExclamation, faXmark, faTrophy, faHouse, faPhone } from '@fortawesome/free-solid-svg-icons';
import anime from 'animejs/lib/anime.es.js';
import VanillaTilt from 'vanilla-tilt';
import { backgrounds, Background } from '../dashboard/shared/data/background';
import { profilePics, ProfilePic } from '../dashboard/shared/data/profile-pic';
import { ProfileThemeService } from '../dashboard/shared/service/profile-theme.service';
import { SeasoncheckerService } from '../dashboard/shared/service/season-checker.service';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink, FontAwesomeModule],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss'
})
export class NotFoundComponent implements AfterViewInit, OnDestroy {
  @ViewChild('errorDialog') errorDialog!: ElementRef<HTMLElement>;
  @ViewChild('achievementToast') achievementToast?: ElementRef<HTMLElement>;
  @ViewChild('avatar') avatar!: ElementRef<HTMLElement & { vanillaTilt?: { destroy(): void } }>;

  readonly faTriangleExclamation = faTriangleExclamation;
  readonly faXmark = faXmark;
  readonly faTrophy = faTrophy;
  readonly faHouse = faHouse;
  readonly faPhone = faPhone;

  readonly quips: string[] = [
    "This page is AFK. It said it would be back in five minutes.",
    "Error 404: Page went to fetch snacks and never came back.",
    "Looks like this page rage-quit.",
    "You've wandered off the map. There's no loot out here.",
    "This page is still stuck in the shader cache.",
    "Respawning in 3... 2... just kidding, it doesn't exist."
  ];

  readonly background?: Background;
  readonly profilePic?: ProfilePic;
  readonly requestedPath: string;
  readonly quip: string;
  readonly reduceMotion: boolean = this.prefersReducedMotion();
  isToastVisible = signal(true);

  private toastTimer?: ReturnType<typeof setTimeout>;

  constructor(
    public themeService: ProfileThemeService,
    seasonChecker: SeasoncheckerService,
    router: Router
  ) {
    const season = seasonChecker.getCurrentSeason();
    this.background = backgrounds.find((bg: Background) => bg.season === season);
    this.profilePic = profilePics.find((pic: ProfilePic) => pic.season === season);
    this.requestedPath = router.url;
    this.quip = this.quips[Math.floor(Math.random() * this.quips.length)];
  }

  ngAfterViewInit() {
    if (!this.reduceMotion) {
      anime({
        targets: this.errorDialog.nativeElement,
        translateY: [-60, 0],
        scale: [0.94, 1],
        opacity: [0, 1],
        easing: 'easeOutBack',
        duration: 900,
        delay: 150
      });

      anime({
        targets: this.achievementToast?.nativeElement,
        translateX: ['120%', '0%'],
        opacity: [0, 1],
        easing: 'easeOutExpo',
        duration: 900,
        delay: 1400
      });

      if (window.innerWidth > 910) {
        VanillaTilt.init(this.avatar.nativeElement, { max: 20, speed: 400, scale: 1.05 });
      }
    }

    this.toastTimer = setTimeout(() => this.dismissToast(), 6500);
  }

  ngOnDestroy() {
    clearTimeout(this.toastTimer);
    this.avatar?.nativeElement.vanillaTilt?.destroy();
  }

  dismissToast() {
    const toast = this.achievementToast?.nativeElement;

    if (!toast || this.reduceMotion) {
      this.isToastVisible.set(false);
      return;
    }

    anime({
      targets: toast,
      translateX: ['0%', '120%'],
      opacity: [1, 0],
      easing: 'easeInQuad',
      duration: 500,
      complete: () => this.isToastVisible.set(false)
    });
  }

  prefersReducedMotion(): boolean {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }
}
