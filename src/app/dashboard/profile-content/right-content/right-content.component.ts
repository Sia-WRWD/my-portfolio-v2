import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { activities } from '../../shared/data/activity';
import { rightContent } from '../../shared/data/right-content';

@Component({
  selector: 'app-right-content',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './right-content.component.html',
  styleUrl: './right-content.component.scss'
})
export class RightContentComponent {
  status: string = "Offline";
  statusColor: string = "";
  activities: any = activities;
  rightContent: any = rightContent;

  ngOnInit() {
    this.statusUpdate();
    this.friendStatusUpdate();
  }

  statusUpdate() {
    const currentDate = new Date();
    const currentHour = currentDate.getHours();

    let statusObj = { status: 'Lost in Coding', statusColor: '#898989' };

    activities.forEach((interval: any) => {
        if (currentHour >= interval.start && currentHour < interval.end) {
            statusObj = { status: interval.status, statusColor: interval.statusColor };
        }
    });

    this.status = statusObj.status;
    this.statusColor = statusObj.statusColor;
  }

  friendStatusUpdate() {
    // Iterate through the friends array and randomize the status
    this.rightContent.forEach((section: any) => {
      if (section.friends) {
        section.friends.forEach((friend: any) => {
          friend.status = this.getRandomStatus(); // Assign a random status
        });
      }
    });
  }

  getRandomStatus(): string {
    const statuses = ['Offline', 'Online', 'In-Game'];
    const randomIndex = Math.floor(Math.random() * statuses.length);
    return statuses[randomIndex];
  }
}
