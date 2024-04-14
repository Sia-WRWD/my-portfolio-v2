import { Component } from '@angular/core';
import { NavigationComponent } from './navigation/navigation.component';
import { ProfileHeaderComponent } from './profile-header/profile-header.component';
import { LoaderComponent } from './loader/loader.component';
import { ProfileContentComponent } from './profile-content/profile-content.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NavigationComponent, ProfileHeaderComponent, LoaderComponent, ProfileContentComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  currentTime: any = "";

  constructor() { }

  ngOnInit() {
    this.getCurrentTime();
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

}


