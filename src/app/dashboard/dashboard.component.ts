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
  profileBgMp4: string = "";
  profileBgWebm: string = "";
  profileBgPoster: string = "";
  profileBgOffMp4: string = "";
  profileBgOffWebm: string = "";
  profileBgOffPoster: string = "";
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

    // Define the seasons by date ranges
    if (season == "Winter") { //Winter
      this.profileBgMp4 = "https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/items/2855140/986083752a0c715ab6c1ade40c690e6bc2432329.mp4";
      this.profileBgWebm = "https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/items/2855140/ce5d466e49827ccd94c616ebca4839a4a25dfbd6.webm";
      this.profileBgPoster = "https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/items/2855140/fda4fdeb85a59563cf324600f9e23477861a02d5.jpg";

      this.profileBgOffMp4 = "https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/items/2855140/e2a8428a48f49312a3fe5c45206b998af76910e8.mp4";
      this.profileBgOffWebm = "https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/items/2855140/44607aab956016c08fe4449861774a9804188fa7.webm";
      this.profileBgOffPoster = "https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/items/2855140/97008e292bf440a5f4e2db5944cef69d467646a0.jpg";
    } else if (season == "Spring") { //Spring
      this.profileBgMp4 = "https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/items/2855140/986083752a0c715ab6c1ade40c690e6bc2432329.mp4";
      this.profileBgWebm = "https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/items/2855140/ce5d466e49827ccd94c616ebca4839a4a25dfbd6.webm";
      this.profileBgPoster = "https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/items/2855140/fda4fdeb85a59563cf324600f9e23477861a02d5.jpg";

      this.profileBgOffMp4 = "https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/items/2855140/e2a8428a48f49312a3fe5c45206b998af76910e8.mp4";
      this.profileBgOffWebm = "https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/items/2855140/44607aab956016c08fe4449861774a9804188fa7.webm";
      this.profileBgOffPoster = "https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/items/2855140/97008e292bf440a5f4e2db5944cef69d467646a0.jpg";
    } else if (season == "Summer") { //Summer
      this.profileBgMp4 = "https://cdn.akamai.steamstatic.com/steamcommunity/public/images/items/2861690/19a2c5ac064c8e252627ee866d77c5806df2b34c.mp4";
      this.profileBgWebm = "https://cdn.akamai.steamstatic.com/steamcommunity/public/images/items/2861690/bf7539d121e6733f868ecafb4b2f21626af9de9a.webm";
      this.profileBgPoster = "https://cdn.akamai.steamstatic.com/steamcommunity/public/images/items/2861690/45c9dc610960631bba87e510f19f7515db3026d2.jpg";

      this.profileBgOffMp4 = "https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/items/2855140/e2a8428a48f49312a3fe5c45206b998af76910e8.mp4";
      this.profileBgOffWebm = "https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/items/2855140/44607aab956016c08fe4449861774a9804188fa7.webm";
      this.profileBgOffPoster = "https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/items/2855140/97008e292bf440a5f4e2db5944cef69d467646a0.jpg";
    } else if (season == "Autumn") { //Autumn
      this.profileBgMp4 = "https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/items/2855140/986083752a0c715ab6c1ade40c690e6bc2432329.mp4";
      this.profileBgWebm = "https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/items/2855140/ce5d466e49827ccd94c616ebca4839a4a25dfbd6.webm";
      this.profileBgPoster = "https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/items/2855140/fda4fdeb85a59563cf324600f9e23477861a02d5.jpg";

      this.profileBgOffMp4 = "https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/items/2855140/e2a8428a48f49312a3fe5c45206b998af76910e8.mp4";
      this.profileBgOffWebm = "https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/items/2855140/44607aab956016c08fe4449861774a9804188fa7.webm";
      this.profileBgOffPoster = "      https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/items/2855140/97008e292bf440a5f4e2db5944cef69d467646a0.jpg";
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