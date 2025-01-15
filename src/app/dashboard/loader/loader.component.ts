import { Component, AfterViewInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import anime from 'animejs/lib/anime.es.js';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [],
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements AfterViewInit {
  @ViewChild('videoPlayer') videoPlayer!: ElementRef<HTMLVideoElement>;
  @ViewChild('loaderMessage') loaderMessage!: ElementRef;

  constructor(private renderer: Renderer2) { }

  ngAfterViewInit() {
    this.renderer.setStyle(document.body, 'overflow-y', 'hidden');

    this.renderer.listen(document, 'click', () => {
      this.fadeOut(this.loaderMessage.nativeElement, () => {
        this.videoPlayer.nativeElement.play();
      });
    });

    this.videoPlayer.nativeElement.onended = () => {
      anime({
        targets: '.loader-container',
        opacity: 0,
        duration: 500,
        easing: 'easeOutQuad',
        complete: () => {
          this.renderer.setStyle(document.querySelector('.loader-container'), 'display', 'none');
          this.renderer.setStyle(document.body, 'overflow-y', 'scroll');
        }
      });
    };
  }

  fadeOut(element: HTMLElement, callback: () => void) {
    anime({
      targets: element,
      opacity: 0,
      duration: 500,
      easing: 'easeOutQuad',
      complete: () => {
        this.renderer.setStyle(element, 'display', 'none');
        callback();
      }
    });
  }
}
