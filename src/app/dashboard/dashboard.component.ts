import { Component, ElementRef, Renderer2 } from '@angular/core';
import { NavigationComponent } from './navigation/navigation.component';
import { ProfileHeaderComponent } from './profile-header/profile-header.component';
import { LoaderComponent } from './loader/loader.component';
import { ProfileContentComponent } from './profile-content/profile-content.component';
import { FooterComponent } from './footer/footer.component';
import anime from 'animejs/lib/anime.es.js';
import { ScrollReachedDirective } from './shared/directives/scroll-reaches.directive';
import { SeasoncheckerService } from './shared/service/season-checker.service';
import { CommonModule } from '@angular/common';
import SakanaWidget from 'sakana-widget';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { ProfileContactComponent } from './profile-content/profile-contact/profile-contact.component';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPhone, faXmark, faChevronUp, faImages, faImage } from '@fortawesome/free-solid-svg-icons';
import { ScrollToTopDirective } from './shared/directives/scroll-to-top.directive';
import { ModalService } from './shared/service/modal.service';
import { Background, backgrounds } from './shared/data/background';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NavigationComponent, ProfileHeaderComponent, LoaderComponent, ProfileContentComponent, FooterComponent, ScrollReachedDirective, CommonModule,
    ProfileContactComponent, NzModalModule, FontAwesomeModule, ScrollToTopDirective],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  currentTime: any = "";
  footerAnimationPlayed: boolean = false;
  currentBackground: any;
  isProfileContentVisible: boolean = true;
  isModalVisible: boolean = false;
  sakanaAnimationPlayed: boolean = false;

  constructor(private library: FaIconLibrary, private seasonChecker: SeasoncheckerService, private renderer: Renderer2, 
    private el: ElementRef, private modalService: ModalService) {
    library.addIcons(
      faPhone,
      faXmark,
      faChevronUp,
      faImages,
      faImage
    )
  }

  ngOnInit() {
    this.getCurrentTime();
    this.bgOnSeasonChange();
    this.modalVisibilitySubscription();
  }

  ngAfterViewInit() {
    this.mountSakanaWidget();
  }

  modalVisibilitySubscription() {
    this.modalService.isVisible$.subscribe(isVisible => {
      this.isModalVisible = isVisible;
    });
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

    this.onSakanaMounted(); //Sakana Animation
  }

  onSakanaMounted() {
    if (this.sakanaAnimationPlayed == false && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      anime({
        targets: '.sakana-widget',
        translateX: ['100%', 0], // Move from left (-100%) to current position (0)
        opacity: [0, 1], // Fade from transparent (0) to opaque (1)
        easing: 'easeInOutQuad', // Use easing for smoother animation
        delay: 500,
        duration: 1000, // Animation duration in milliseconds
        loop: false
      });
      
      this.sakanaAnimationPlayed = true;
    }
  }

  onFooterIntersection() {
    if (!this.footerAnimationPlayed && !window.matchMedia('(prefers-reduced-motion: reduce)').matches && this.isProfileContentVisible) {
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

  bgOnSeasonChange() {
    const season = this.seasonChecker.getCurrentSeason();
    const background = backgrounds.find((bg: Background) => bg.season === season);

    if (background) {
      this.currentBackground = {
        profileBgMp4: background.profileBgMp4,
        profileBgWebm: background.profileBgWebm,
        profileBgPoster: background.profileBgPoster,
        profileBgOffMp4: background.profileBgOffMp4,
        profileBgOffWebm: background.profileBgOffWebm,
        profileBgOffPoster: background.profileBgOffPoster
      };
    } else {
      console.error('Season not found!');
    }
  }

  openContactModal() {
    this.modalService.showModal();
  }

  hideProfileContent() {
    this.isProfileContentVisible = false;
    anime({
      targets: ['.profile-header', '.profile-content', '.profile-footer'],
      opacity: [1, 0], // Fade from transparent (0) to opaque (1)
      easing: 'easeInOutQuad', // Use easing for smoother animation
      delay: 0,
      duration: 1000, // Animation duration in milliseconds
      complete: function (anim) {
        // After the animation completes, set display to none
        document.querySelectorAll('.profile-header, .profile-content, .profile-footer').forEach(el => {
          (el as HTMLElement).style.visibility = 'hidden';
        });
      }
    });
  }

  showProfileContent() {
    // Before starting the animation, set display to block
    document.querySelectorAll('.profile-header, .profile-content, .profile-footer').forEach(el => {
      (el as HTMLElement).style.visibility = 'visible';
    });
    this.isProfileContentVisible = true;
    anime({
      targets: ['.profile-header', '.profile-content', '.profile-footer'],
      opacity: [0, 1], // Fade from transparent (0) to opaque (1)
      visibility: ['hidden', 'visible'],
      easing: 'easeInOutQuad', // Use easing for smoother animation
      delay: 0,
      duration: 1000 // Animation duration in milliseconds
    });
  }
}