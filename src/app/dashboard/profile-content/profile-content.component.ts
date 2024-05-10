import { Component, ElementRef, Renderer2 } from '@angular/core';
import anime from 'animejs/lib/anime.es.js';
import { ProfileStacksComponent } from './profile-stacks/profile-stacks.component';
import { ProfileEducationComponent } from './profile-education/profile-education.component';
import { ProfileProjectComponent } from './profile-project/profile-project.component';
import { ProfileWorkexpComponent } from './profile-workexp/profile-workexp.component';
import { ProfileContactComponent } from './profile-contact/profile-contact.component';
import { RightContentComponent } from './right-content/right-content.component';
import { InViewportModule } from 'ng-in-viewport';
import { CommonModule } from '@angular/common';
import { ScrollReachedDirective } from 'src/app/dashboard/shared/directives/scroll-reaches.directive';
import { ScrollReachedNavDirective } from 'src/app/dashboard/shared/directives/scroll-reaches-nav.directive';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChevronUp, faPhone, faXmark } from '@fortawesome/free-solid-svg-icons';
import { ModalService } from 'ngx-modal-ease';
import { ScrollToTopDirective } from '../shared/directives/scroll-to-top.directive';
import SakanaWidget from 'sakana-widget';

@Component({
  selector: 'app-profile-content',
  standalone: true,
  imports: [
    ProfileStacksComponent, ProfileEducationComponent, ProfileProjectComponent,
    ProfileWorkexpComponent, ProfileContactComponent, InViewportModule, ScrollReachedDirective, ScrollReachedNavDirective,
    CommonModule, RightContentComponent, FontAwesomeModule, ScrollToTopDirective
  ],
  templateUrl: './profile-content.component.html',
  styleUrl: './profile-content.component.scss'
})
export class ProfileContentComponent {

  stacksAnimationPlayed: boolean = false;
  workexpAnimationPlayed: boolean = false;
  projAnimationPlayed: boolean = false;
  eduAnimationPlayed: boolean = false;
  rightContentAnimationPlayed: boolean = false;
  modalVisible: boolean = false;

  constructor(private library: FaIconLibrary, private modalService: ModalService, private renderer: Renderer2, private el: ElementRef) {
    library.addIcons(
      faPhone,
      faXmark,
      faChevronUp
    )
  }

  ngOninit() {

  }

  ngAfterViewInit() {
    this.onResponsiveWorkExpIntersection();
    this.mountSakanaWidget();
  }

  mountSakanaWidget() {
    const takina = SakanaWidget.getCharacter('takina');
    takina!.initialState = {
      ...takina!.initialState,
      i: 0.011,
      d: 1,
    };
    SakanaWidget.registerCharacter('takina-slow', takina!);
    new SakanaWidget({ character: 'takina-slow' }).mount('#sakana-widget');

    // Get the parent element with class sakana-widget-ctrl
    const parentElement = this.el.nativeElement.querySelector('.sakana-widget-ctrl');

    // Get the child <a> element
    const anchorElement = parentElement.querySelector('a');

    // Remove the <a> element if it exists
    if (anchorElement) {
      this.renderer.removeChild(parentElement, anchorElement);
    }
  }

  onStacksIntersection({ target, visible }: { target: Element; visible: boolean }): void {
    if (this.stacksAnimationPlayed == false && visible && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {

      var delay = 0;

      if (window.innerWidth > 910) {
        delay = 500
      } else {
        delay = 1000
      }

      anime({
        targets: '.anime-profile-stacks',
        translateX: ['-100%', 0], // Move from left (-100%) to current position (0)
        opacity: [0, 1], // Fade from transparent (0) to opaque (1)
        easing: 'easeInOutQuad', // Use easing for smoother animation
        delay: delay,
        duration: 1000, // Animation duration in milliseconds
        loop: false
      });

      anime({
        targets: '.sakana-widget',
        translateX: ['100%', 0], // Move from left (-100%) to current position (0)
        opacity: [0, 1], // Fade from transparent (0) to opaque (1)
        easing: 'easeInOutQuad', // Use easing for smoother animation
        delay: 500,
        duration: 1000, // Animation duration in milliseconds
        loop: false
      });

      this.stacksAnimationPlayed = true;
    }
  }

  onWorkExpIntersection(): void {
    if (!this.workexpAnimationPlayed && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      anime({
        targets: '.anime-profile-workexp',
        translateX: ['100%', 0], // Move from left (-100%) to current position (0)
        opacity: [0, 1], // Fade from transparent (0) to opaque (1)
        easing: 'easeInOutQuad', // Use easing for smoother animation
        delay: 0,
        duration: 1000 // Animation duration in milliseconds
      });
      this.workexpAnimationPlayed = true;
    }
  }

  onResponsiveWorkExpIntersection() {
    if (!this.workexpAnimationPlayed && !window.matchMedia('(prefers-reduced-motion: reduce)').matches && window.innerHeight >= 754 && window.innerWidth > 910) {
      anime({
        targets: '.anime-profile-workexp',
        translateX: ['100%', 0], // Move from left (-100%) to current position (0)
        opacity: [0, 1], // Fade from transparent (0) to opaque (1)
        easing: 'easeInOutQuad', // Use easing for smoother animation
        delay: 1000,
        duration: 1000 // Animation duration in milliseconds
      });
      this.workexpAnimationPlayed = true;
    }
  }

  onProjIntersection(): void {
    if (!this.projAnimationPlayed && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      anime({
        targets: '.anime-profile-project',
        translateX: ['-100%', 0], // Move from left (-100%) to current position (0)
        opacity: [0, 1], // Fade from transparent (0) to opaque (1)
        easing: 'easeInOutQuad', // Use easing for smoother animation
        delay: 0,
        duration: 1000 // Animation duration in milliseconds
      });
      this.projAnimationPlayed = true;
    }
  }

  onEduIntersection(): void {
    if (!this.eduAnimationPlayed && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      anime({
        targets: '.anime-profile-edu',
        translateX: ['100%', 0], // Move from left (-100%) to current position (0)
        opacity: [0, 1], // Fade from transparent (0) to opaque (1)
        easing: 'easeInOutQuad', // Use easing for smoother animation
        delay: 0,
        duration: 1000 // Animation duration in milliseconds
      });
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

  onRightContentIntersection({ target, visible }: { target: Element; visible: boolean }): void {
    if (this.rightContentAnimationPlayed == false && visible && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {

      if (window.innerWidth > 910) {
        anime({
          targets: '.right-profile-content-container',
          translateY: ['100%', 0], // Move from left (-100%) to current position (0)
          opacity: [0, 1], // Fade from transparent (0) to opaque (1)
          easing: 'easeInOutQuad', // Use easing for smoother animation
          delay: 750,
          duration: 1000, // Animation duration in milliseconds
          loop: false
        });
        this.rightContentAnimationPlayed = true;
      } else {
        anime({
          targets: '.right-profile-content-container',
          translateX: ['100%', 0], // Move from left (-100%) to current position (0)
          opacity: [0, 1], // Fade from transparent (0) to opaque (1)
          easing: 'easeInOutQuad', // Use easing for smoother animation
          delay: 500,
          duration: 1000, // Animation duration in milliseconds
          loop: false
        });
        this.rightContentAnimationPlayed = true;
      }
    }
  }

  openContactModal() {
    var animationModalEnter;
    var animationModalLeave;

    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      animationModalEnter = 'enter-scale-down 0.3s ease-out';
      animationModalLeave = 'scale-rotate 1s linear';
    } else {
      animationModalEnter = 'fade-in 0.3s linear';
      animationModalLeave = 'fade-out 0.3s linear';
    }

    this.modalService.open(ProfileContactComponent, {
      modal: {
        enter: animationModalEnter,
        leave: animationModalLeave,
      },
      overlay: {
        leave: 'fade-out 0.1s linear',
      },
      size: {
        width: '100%', //calc(100% - 0.5rem - 14px - 40px)
      },
      actions: {
        click: false,
        escape: false
      }
    })

    this.toggleBodyOverflow(true);
  }

  closeContactModal() {
    this.modalService.close();
    this.toggleBodyOverflow(false);
  }

  toggleBodyOverflow(hide: boolean) {
    const body = document.querySelector('body');

    if (hide == true) {
      body!.style.overflow = "hidden";
      this.modalVisible = true;
    } else {
      body!.removeAttribute('style');
      this.modalVisible = false;
    }
  }
}
