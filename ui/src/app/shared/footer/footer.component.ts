import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LucideAngularModule, UserRoundPen, MapPinned, Settings } from 'lucide-angular';

@Component({
  selector: 'app-footer',
  imports: [LucideAngularModule],
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  private router = inject(Router);
  page: string;

  readonly profileIcon = UserRoundPen;
  readonly tripsIcon = MapPinned;
  readonly settingsIcon = Settings;

  constructor() {
    this.page = localStorage.getItem('page') || 'trips';
  }

  onProfile() {
    this.page = 'profile';
    localStorage.setItem('page', 'profile');
    this.router.navigate(['/app/profile']);
  }

  onTrips() {
    this.page = 'trips';
    localStorage.setItem('page', 'trips');
    this.router.navigate(['/app/trips']);
  }

  onSettings() {
    this.page = 'settings';
    localStorage.setItem('page', 'settings');
    this.router.navigate(['/app/settings']);
  }
}
