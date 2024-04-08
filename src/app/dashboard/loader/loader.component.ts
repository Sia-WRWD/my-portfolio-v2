import { Component } from '@angular/core';
import anime from 'animejs/lib/anime.es.js';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss'
})
export class LoaderComponent {

  ngAfterViewInit() {
    const svgPath = document.querySelectorAll('.path');

    anime({
      targets: svgPath,
      loop: true,
      direction: 'alternate',
      strokeDashoffset: [anime.setDashoffset, 0],
      easing: 'easeInOutSine',
      duration: 700,
      delay: (el, i) => { return i * 500 }
    });
  }

}
