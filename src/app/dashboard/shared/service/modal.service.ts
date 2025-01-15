import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private isVisibleSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() {}

  // Observable for the visibility state
  get isVisible$(): Observable<boolean> {
    return this.isVisibleSubject.asObservable();
  }

  // Method to show the modal
  showModal(): void {
    this.isVisibleSubject.next(true);
  }

  // Method to hide the modal
  hideModal(): void {
    this.isVisibleSubject.next(false);
  }
}