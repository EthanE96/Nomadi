import { Component, Input, ViewChild, ElementRef, inject } from '@angular/core';
import { LucideAngularModule, RotateCcw, Pencil } from 'lucide-angular';
import { Trip, TripEvent, TripStoreService } from '../../services/trip-store.service';
import { MessageComponent } from '../../../../../shared/message/message.component';

@Component({
  selector: 'app-timeline',
  standalone: true,
  imports: [LucideAngularModule, MessageComponent],
  templateUrl: './timeline.component.html',
})
export class TimelineComponent {
  readonly refreshIcon = RotateCcw;
  readonly pencilIcon = Pencil;
  private tripStoreService = inject(TripStoreService);

  @Input() trip?: Trip;
  @ViewChild('editModal') editModal?: ElementRef<HTMLDialogElement>;
  @ViewChild('generateModal') generateModal?: ElementRef<HTMLDialogElement>;
  @ViewChild(MessageComponent) messageComponent?: MessageComponent;

  selectedEvent?: TripEvent;

  onEditButton(event: TripEvent) {
    this.selectedEvent = event;
    this.editModal?.nativeElement.showModal();
  }

  onGenerateButton(event: TripEvent) {
    this.selectedEvent = event;
    this.generateModal?.nativeElement.showModal();
  }

  onEditDescription(event: Event) {
    const value = (event.target as HTMLTextAreaElement).value ?? '';

    if (!this.trip) return;
    if (!this.selectedEvent) return;

    this.selectedEvent.description = value;
    this.tripStoreService.updateTripEvent(this.trip.id, this.selectedEvent.id, value);

    this.messageComponent?.onMessage(
      'Event description updated successfully!',
      'success'
    );
  }

  onGenerateDescription(event: Event) {
    //AI Generation Placeholder
    const value = (event.target as HTMLTextAreaElement).value ?? '';

    if (!this.trip) return;
    if (!this.selectedEvent) return;

    this.selectedEvent.description = value;
    this.tripStoreService.updateTripEvent(this.trip.id, this.selectedEvent.id, value);

    this.messageComponent?.onMessage(
      'Event description generated successfully!',
      'success'
    );
  }
}
