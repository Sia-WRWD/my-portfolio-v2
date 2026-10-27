import { Component, ViewChild } from '@angular/core';
import anime from 'animejs/lib/anime.es.js';
import { ProfileStacksComponent } from './profile-stacks/profile-stacks.component';
import { ProfileEducationComponent } from './profile-education/profile-education.component';
import { ProfileProjectComponent } from './profile-project/profile-project.component';
import { ProfileWorkexpComponent } from './profile-workexp/profile-workexp.component';
import { RightContentComponent } from './right-content/right-content.component';
import { CommonModule } from '@angular/common';
import { ScrollReachedDirective } from 'src/app/dashboard/shared/directives/scroll-reaches.directive';
import { ScrollReachedNavDirective } from 'src/app/dashboard/shared/directives/scroll-reaches-nav.directive';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChevronUp, faImage, faImages, faPhone, faXmark } from '@fortawesome/free-solid-svg-icons';
import { IntroService } from '../shared/service/intro.service';

// Where each section sits in the sequence that plays as the intro hands over (ms after it ends).
const REVEAL_SLOTS = {
  stacks: 150,
  rightContent: 250,
  workexp: 350,
  project: 450,
  edu: 550
};

@Component({
  selector: 'app-profile-content',
  standalone: true,
  imports: [
    ProfileStacksComponent, ProfileEducationComponent, ProfileProjectComponent,
    ProfileWorkexpComponent, ScrollReachedDirective, ScrollReachedNavDirective,
    CommonModule, RightContentComponent, FontAwesomeModule
  ],
  templateUrl: './profile-content.component.html',
  styleUrl: './profile-content.component.scss'
})
export class ProfileContentComponent {
  @ViewChild(ProfileStacksComponent) stacksSection!: ProfileStacksComponent;
  @ViewChild(ProfileWorkexpComponent) workexpSection!: ProfileWorkexpComponent;
  @ViewChild(ProfileProjectComponent) projectSection!: ProfileProjectComponent;
  @ViewChild(ProfileEducationComponent) eduSection!: ProfileEducationComponent;

  stacksAnimationPlayed: boolean = false;
  workexpAnimationPlayed: boolean = false;
  projAnimationPlayed: boolean = false;
  eduAnimationPlayed: boolean = false;
  rightContentAnimationPlayed: boolean = false;

  constructor(private library: FaIconLibrary, private intro: IntroService) {
    library.addIcons(
      faPhone,
      faXmark,
      faChevronUp,
      faImages,
      faImage
    )
  }

  prefersReducedMotion(): boolean {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  // Slides a section in, then returns when its own content should start so the two never overlap.
  revealSection(selector: string, fromX: number, slotMs: number): number {
    const delay = this.intro.delayFor(slotMs);

    anime({
      targets: selector,
      translateX: [fromX, 0],
      translateY: [24, 0],
      opacity: [0, 1],
      easing: 'easeOutCubic',
      delay,
      duration: 650,
      complete: () => document.querySelector<HTMLElement>(selector)?.style.removeProperty('transform')
    });

    return delay + 200;
  }

  onStacksIntersection(): void {
    if (!this.stacksAnimationPlayed && !this.prefersReducedMotion()) {
      const contentDelay = this.revealSection('.anime-profile-stacks', -60, REVEAL_SLOTS.stacks);
      this.stacksSection.playIntro(contentDelay);
      this.stacksAnimationPlayed = true;
    }
  }

  onWorkExpIntersection(): void {
    if (!this.workexpAnimationPlayed && !this.prefersReducedMotion()) {
      const contentDelay = this.revealSection('.anime-profile-workexp', 60, REVEAL_SLOTS.workexp);
      this.workexpSection.playIntro(contentDelay);
      this.workexpAnimationPlayed = true;
    }
  }

  onProjIntersection(): void {
    if (!this.projAnimationPlayed && !this.prefersReducedMotion()) {
      const contentDelay = this.revealSection('.anime-profile-project', -60, REVEAL_SLOTS.project);
      this.projectSection.playIntro(contentDelay);
      this.projAnimationPlayed = true;
    }
  }

  onEduIntersection(): void {
    if (!this.eduAnimationPlayed && !this.prefersReducedMotion()) {
      const contentDelay = this.revealSection('.anime-profile-edu', 60, REVEAL_SLOTS.edu);
      this.eduSection.playIntro(contentDelay);
      this.eduAnimationPlayed = true;
    }
  }

  onNavScrollReached(section: string) {
    // Remove the "header-menuitem-active" class from all elements
    const allSections = document.querySelectorAll('.header-menuitem-active');
    allSections.forEach((element) => {
      element.classList.remove('header-menuitem-active');
    });

    // Add the "header-menuitem-active" class to the newly reached section
    const sectionReached = document.querySelector(`.${section}`);
    sectionReached?.classList.add('header-menuitem-active');
  }

  onRightContentIntersection(): void {
    if (!this.rightContentAnimationPlayed && !this.prefersReducedMotion()) {
      const isDesktop = window.innerWidth > 910;

      anime({
        targets: '.right-profile-content-container',
        translateX: isDesktop ? [0, 0] : [60, 0],
        translateY: isDesktop ? [60, 0] : [24, 0],
        opacity: [0, 1],
        easing: 'easeOutCubic',
        delay: this.intro.delayFor(REVEAL_SLOTS.rightContent),
        duration: 700,
        complete: () => document.querySelector<HTMLElement>('.right-profile-content-container')?.style.removeProperty('transform')
      });
      this.rightContentAnimationPlayed = true;
    }
  }
}
