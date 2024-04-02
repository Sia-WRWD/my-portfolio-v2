import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavigationComponent } from './navigation/navigation.component';
import { ProfileHeaderComponent } from './profile-header/profile-header.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NavigationComponent, ProfileHeaderComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  @ViewChild('video') videoElement!: ElementRef;

  constructor() {}

  ngAfterViewInit(): void {
    console.log(this.videoElement.nativeElement);
    // Access the video element and play it
    this.videoElement.nativeElement.play();
  }
}


