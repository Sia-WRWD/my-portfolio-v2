import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SeasoncheckerService {

  constructor() { }

  getCurrentSeason(): string {
    const date = new Date();
    const month = date.getMonth() + 1; // getMonth() returns 0-based month
    const day = date.getDate();

    // Define the seasons by date ranges
    if ((month === 12 && day >= 21) || (month === 1) || (month === 2) || (month === 3 && day <= 19)) { // Winter
      return 'Winter';
    } else if ((month === 3 && day >= 20) || (month === 4) || (month === 5) || (month === 6 && day <= 20)) { // Spring
      return 'Spring';
    } else if ((month === 6 && day >= 21) || (month === 7) || (month === 8) || (month === 9 && day <= 21)) { // Summer
      return 'Summer';
    } else if ((month === 9 && day >= 22) || (month === 10) || (month === 11) || (month === 12 && day <= 20)) { // Autumn
      return 'Autumn';
    } else {
      return 'Spring';
    }
  }
}
