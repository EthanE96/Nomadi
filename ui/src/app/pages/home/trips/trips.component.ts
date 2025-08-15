import { Component, inject, Signal } from '@angular/core';
import { Router } from '@angular/router';
import { LucideAngularModule, Share2, Info, CirclePlus, Trash2 } from 'lucide-angular';
import { Trip, TripStoreService } from './services/trip-store.service';
import { MessageComponent } from '../../../shared/message/message.component';

@Component({
  selector: 'app-trips',
  imports: [LucideAngularModule, MessageComponent],
  templateUrl: './trips.component.html',
})
export class TripsComponent {
  private router = inject(Router);
  private tripStore = inject(TripStoreService);
  private messageComponent = inject(MessageComponent);

  readonly shareIcon = Share2;
  readonly infoIcon = Info;
  readonly plusIcon = CirclePlus;
  readonly deleteIcon = Trash2;

  trips: Signal<Trip[]> = this.tripStore.trips;

  onTripDetails(tripId: string) {
    this.router.navigate(['/app/trips/details', tripId]);
  }

  onTripCreate() {
    console.log('Trip created');

    this.messageComponent.onMessage('Trip created successfully!', 'success');
  }
}
