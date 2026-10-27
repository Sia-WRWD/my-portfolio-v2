import { Component, AfterViewInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import anime from 'animejs/lib/anime.es.js';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faForward } from '@fortawesome/free-solid-svg-icons';
import { IntroService } from '../shared/service/intro.service';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements AfterViewInit {
  @ViewChild('videoPlayer') videoPlayer!: ElementRef<HTMLVideoElement>;
  @ViewChild('loaderMessage') loaderMessage!: ElementRef;
  @ViewChild('loaderContainer') loaderContainer!: ElementRef<HTMLElement>;
  isVideoPlayed: boolean = false;
  isFinished: boolean = false;

  constructor(private renderer: Renderer2, private intro: IntroService, library: FaIconLibrary) {
    library.addIcons(faForward);
  }

  ngAfterViewInit() {
    // In-app navigations (e.g. from the 404 page) have already seen the intro.
    if (history.state?.skipIntro) {
      this.isFinished = true;
      this.videoPlayer.nativeElement.pause();
      this.renderer.setStyle(this.loaderContainer.nativeElement, 'display', 'none');
      this.intro.complete();
      return;
    }

    this.renderer.setStyle(document.body, 'overflow-y', 'hidden');

    this.renderer.listen(document, 'click', () => {
      if (!this.isVideoPlayed && !this.isFinished) {
        this.fadeOut(this.loaderMessage.nativeElement, () => {
          this.videoPlayer.nativeElement.play();
          this.isVideoPlayed = true;
        });
      }
    });

    this.videoPlayer.nativeElement.onended = () => this.finish();
  }

  skipIntro(event: Event) {
    // Keep the click from reaching the document listener that starts the video.
    event.stopPropagation();
    this.isVideoPlayed = true;
    this.videoPlayer.nativeElement.pause();
    this.finish();
  }

  finish() {
    if (this.isFinished) {
      return;
    }
    this.isFinished = true;

    this.fadeOut(this.loaderContainer.nativeElement, () => {
      this.renderer.setStyle(document.body, 'overflow-y', 'scroll');
      this.intro.complete();
    });
  }

  fadeOut(element: HTMLElement, callback: () => void) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      this.renderer.setStyle(element, 'display', 'none');
      callback();
      return;
    }

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
