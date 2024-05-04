import { Component, ElementRef } from '@angular/core';
import anime from 'animejs/lib/anime.es.js';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAddressCard, faInfoCircle, faMapLocationDot } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-profile-contact',
  standalone: true,
  imports: [ReactiveFormsModule, FontAwesomeModule],
  templateUrl: './profile-contact.component.html',
  styleUrl: './profile-contact.component.scss'
})
export class ProfileContactComponent {
  contactName = new FormControl('');
  contactEmail = new FormControl('');
  contactMessage = new FormControl('');
  msgPlaceholder: any = `In this journey of life, every step forward is an adventure into the unknown. Strength lies not in the muscles, but in the courage of the heart. Every challenge faced is but a stepping stone towards growth. Let the icy winds of adversity sharpen your resolve. In the frozen expanse, discover the beauty of resilience. Embrace the chill of uncertainty, for within it lies the spark of possibility. Like the snowflakes that dance in the wind, each moment is fleeting yet precious. May the stars guide us through the coldest of nights, lighting our path with hope.`;
  mapVisible: boolean = false;

  constructor(private library: FaIconLibrary, private elementRef: ElementRef) {
    library.addIcons(
      faInfoCircle,
      faAddressCard,
      faMapLocationDot
    )
  }

  showOtherMethods() {

  }

  showInfo() {

  }

  showLocation(mapVisibility: boolean) {
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {

      if (window.innerWidth > 960) {
        const googleMapElement = this.elementRef.nativeElement.querySelector('.google-map');
        const shrinkExpandWidth = googleMapElement.offsetWidth;

        if (mapVisibility == false) {
          anime({
            targets: '.contact-modal-right',
            width: [0, shrinkExpandWidth],
            easing: 'easeInOutQuad',
            delay: 0,
            duration: 1000
          })

          anime({
            targets: '.google-map',
            translateY: ['-100%', 0],
            opacity: [0, 1],
            easing: 'easeInOutQuad',
            delay: 1100,
            duration: 1000
          });
        } else {
          anime({
            targets: '.google-map',
            translateY: [0, '100%'],
            opacity: [1, 0],
            easing: 'easeInOutQuad',
            delay: 0,
            duration: 1000
          });

          anime({
            targets: '.contact-modal-right',
            width: [shrinkExpandWidth, 0],
            easing: 'easeInOutQuad',
            delay: 1100,
            duration: 1000
          })
        }
      } else {
        const innerModalElement = this.elementRef.nativeElement.querySelector('.contact-modal-inner-container');
        const resShrinkExpandWidth = innerModalElement.offsetWidth;

        if (mapVisibility == false) {
          anime({
            targets: '.contact-modal-right',
            width: [0, resShrinkExpandWidth],
            height: ['0px', '100%'],
            easing: 'easeInOutQuad',
            delay: 0,
            duration: 1000
          })

          anime({
            targets: '.google-map',
            width: [0, resShrinkExpandWidth],
            opacity: [0, 1],
            easing: 'easeInOutQuad',
            delay: 1100,
            duration: 1000
          });
        } else {
          anime({
            targets: '.google-map',
            width: [resShrinkExpandWidth, 0],
            opacity: [1, 0],
            easing: 'easeInOutQuad',
            delay: 0,
            duration: 1000
          });

          anime({
            targets: '.contact-modal-right',
            width: [resShrinkExpandWidth, 0],
            height: ['100%', '0px'],
            easing: 'easeInOutQuad',
            delay: 1100,
            duration: 1000
          })
        }
      }

      // Toggle mapVisible based on mapVisibility
      this.mapVisible = !mapVisibility;
    }
  }


  sendMessage() {

  }


}
