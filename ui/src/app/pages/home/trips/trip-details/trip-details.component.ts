import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Trip, TripStoreService } from '../services/trip-store.service';
import { TimelineComponent } from './timeline/timeline.component';

@Component({
  selector: 'app-trip-details',
  standalone: true,
  imports: [TimelineComponent],
  templateUrl: './trip-details.component.html',
})
export class TripDetailsComponent {
  private activatedRoute = inject(ActivatedRoute);
  private tripStore = inject(TripStoreService);

  trip?: Trip;

  constructor() {
    this.activatedRoute.params.subscribe((params) => {
      this.trip = this.tripStore.getTripById(params['id']);
    });
  }
}
