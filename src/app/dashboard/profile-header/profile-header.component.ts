import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-profile-header',
  standalone: true,
  imports: [],
  templateUrl: './profile-header.component.html',
  styleUrl: './profile-header.component.scss'
})
export class ProfileHeaderComponent {
  @ViewChild('profileSummaryModal') profileSummaryModal!: ElementRef;

  myAge: number = 0;

  ngOnInit() {
    this.calculateAge();
  }

  ngAfterViewInit() {

  }

  setModalVisibility(visible: boolean) {
    if (visible == true) {
      this.profileSummaryModal.nativeElement.style.visibility = "visible";
    } else {
      this.profileSummaryModal.nativeElement.style.visibility = "hidden";
    }
  }

  calculateAge() {
    const today = new Date();
    this.myAge = today.getFullYear() - 2001;
  }
}
