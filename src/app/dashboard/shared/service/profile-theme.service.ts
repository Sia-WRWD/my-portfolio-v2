import { Injectable, computed, signal } from '@angular/core';
import { SeasoncheckerService } from './season-checker.service';

export type ProfileTheme = 'seasonal' | 'summer' | 'midnight' | 'steel' | 'cosmic';

export interface ProfileThemeOption {
  id: ProfileTheme;
  label: string;
  swatch: string;
}

const STORAGE_KEY = 'profile-theme';

@Injectable({
  providedIn: 'root'
})
export class ProfileThemeService {

  readonly options: ProfileThemeOption[] = [
    { id: 'seasonal', label: 'Seasonal', swatch: 'conic-gradient(#8fd3ff, #ff9ec4, #ffc95c, #ff6b61, #8fd3ff)' },
    { id: 'summer', label: 'Summer', swatch: 'linear-gradient(135deg, #ffce5c, #ff8040)' },
    { id: 'midnight', label: 'Midnight', swatch: 'linear-gradient(135deg, #304096, #6234aa)' },
    { id: 'steel', label: 'Steel', swatch: 'linear-gradient(135deg, #8496a8, #485c70)' },
    { id: 'cosmic', label: 'Cosmic', swatch: 'linear-gradient(135deg, #b052e0, #ff5ca4)' }
  ];

  readonly theme = signal<ProfileTheme>(this.readStoredTheme());

  // The value written to [data-profile-theme]; "seasonal" resolves to the current season's palette.
  readonly appliedTheme = computed(() => {
    const theme = this.theme();
    return theme === 'seasonal' ? this.seasonChecker.getCurrentSeason().toLowerCase() : theme;
  });

  constructor(private seasonChecker: SeasoncheckerService) { }

  setTheme(theme: ProfileTheme) {
    this.theme.set(theme);
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // Storage can be unavailable (private mode); the theme still applies for this visit.
    }
  }

  private readStoredTheme(): ProfileTheme {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as ProfileTheme | null;
      if (stored && this.options.some(option => option.id === stored)) {
        return stored;
      }
    } catch { }
    return 'seasonal';
  }
}
