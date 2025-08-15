import { Injectable, signal } from '@angular/core';

export interface TripEvent {
  id: string;
  date: string;
  description: string;
}

export interface Trip {
  id: string;
  city: string;
  dates: string;
  description: string;
  code: string;
  events: TripEvent[];
}

const mockTrips: Trip[] = [
  {
    id: 'NYC_001',
    city: 'New York, USA',
    dates: '2024-07-01 - 2024-07-10',
    description:
      'Explore the vibrant city life, iconic landmarks, and diverse cuisine of New York City. Visit Times Square, Central Park, and the Statue of Liberty.',
    code: 'NYC',
    events: [
      {
        id: 'evt1',
        date: '2024-07-01',
        description:
          'Arrive in NYC, check in to hotel. Then explore the city. Then visit the Empire State Building. Then have dinner at a local restaurant.',
      },
      {
        id: 'evt2',
        date: '2024-07-02',
        description: 'Visit Times Square and Central Park.',
      },
      {
        id: 'evt3',
        date: '2024-07-04',
        description: 'Statue of Liberty tour.',
      },
      {
        id: 'evt4',
        date: '2024-07-08',
        description: 'Broadway show and dinner.',
      },
    ],
  },
  {
    id: 'NYC_002',
    city: 'New York - Brooklyn, USA',
    dates: '2024-08-15 - 2024-08-22',
    description:
      'Experience the trendy neighborhoods of Brooklyn, from DUMBO to Williamsburg. Enjoy artisanal coffee, street art, and waterfront views.',
    code: 'BKN',
    events: [
      {
        id: 'evt1',
        date: '2024-08-15',
        description: 'Arrive in Brooklyn, settle in Airbnb.',
      },
      {
        id: 'evt2',
        date: '2024-08-16',
        description: 'Walk the Brooklyn Bridge and visit DUMBO.',
      },
      {
        id: 'evt3',
        date: '2024-08-18',
        description: 'Williamsburg coffee tour.',
      },
      {
        id: 'evt4',
        date: '2024-08-20',
        description: 'Street art walk and Smorgasburg food market.',
      },
    ],
  },
  {
    id: 'NYC_003',
    city: 'New York - Manhattan, USA',
    dates: '2024-09-01 - 2024-09-05',
    description:
      'A quick business trip to Manhattan with stops at the Financial District, Broadway shows, and rooftop dining experiences.',
    code: 'MAN',
    events: [
      {
        id: 'evt1',
        date: '2024-09-01',
        description: 'Arrive in Manhattan, check in to hotel.',
      },
      {
        id: 'evt2',
        date: '2024-09-02',
        description: 'Meetings in Financial District.',
      },
      {
        id: 'evt3',
        date: '2024-09-03',
        description: 'Broadway show in the evening.',
      },
      {
        id: 'evt4',
        date: '2024-09-04',
        description: 'Rooftop dinner and city views.',
      },
    ],
  },
];

@Injectable({ providedIn: 'root' })
export class TripStoreService {
  // Initialize trips as a signal with mock data
  trips = signal<Trip[]>(mockTrips);

  getTripById(id: string): Trip | undefined {
    return this.trips().find((trip) => trip.id === id);
  }

  updateTripEvent(tripId: string, eventId: string, updatedDescription: string): void {
    const trip = this.getTripById(tripId);

    if (trip) {
      const eventIndex = trip.events.findIndex((event) => event.id === eventId);
      if (eventIndex !== -1) {
        trip.events[eventIndex].description = updatedDescription;
        this.trips.set([...this.trips()]);
      }
    }
  }
}
