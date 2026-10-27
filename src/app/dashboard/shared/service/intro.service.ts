import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

// Provided per dashboard instance, so every visit to the profile gets a fresh intro.
@Injectable()
export class IntroService {
  private doneAt: number | null = null;
  private readonly doneSubject = new ReplaySubject<void>(1);

  get done$(): Observable<void> {
    return this.doneSubject.asObservable();
  }

  complete(): void {
    if (this.doneAt !== null) {
      return;
    }
    this.doneAt = performance.now();
    this.doneSubject.next();
  }

  // Delay (ms) that keeps a reveal on its slot of the post-intro sequence.
  // Anything reached later by scrolling has missed its slot and plays straight away.
  delayFor(slotMs: number): number {
    if (this.doneAt === null) {
      return slotMs;
    }
    return Math.max(0, this.doneAt + slotMs - performance.now());
  }
}
