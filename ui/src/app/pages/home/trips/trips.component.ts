import { Component, ElementRef, inject, Signal, ViewChild } from '@angular/core';
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
  readonly shareIcon = Share2;
  readonly infoIcon = Info;
  readonly plusIcon = CirclePlus;
  readonly deleteIcon = Trash2;
  private router = inject(Router);
  private tripStore = inject(TripStoreService);

  @ViewChild(MessageComponent) messageComponent?: MessageComponent;
  @ViewChild('createModal') tripCreateModal?: ElementRef<HTMLDialogElement>;

  trips: Signal<Trip[]> = this.tripStore.trips;

  onTripDetails(tripId: string) {
    this.router.navigate(['/app/trips/details', tripId]);
  }

  onTripCreateButton() {
    this.tripCreateModal?.nativeElement.showModal();
  }

  onTripCreate(event: Event) {
    console.log('Trip created', event);
    this.messageComponent?.onMessage('Trip created successfully!', 'success');
  }

  onTripDelete(tripId: string) {
    console.log(`Trip deleted: ${tripId}`);
    this.messageComponent?.onMessage('Trip deleted successfully!', 'success');
  }
}
