import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';
import { signal } from '@angular/core';

import { TripDetailsComponent } from './trip-details.component';
import { TripStoreService, Trip } from '../services/trip-store.service';

describe('TripDetailsComponent', () => {
  let component: TripDetailsComponent;
  let fixture: ComponentFixture<TripDetailsComponent>;
  let mockTripStore: jasmine.SpyObj<TripStoreService>;

  const mockTrip: Trip = {
    id: 'NYC_001',
    city: 'New York, USA',
    dates: '2024-07-01 - 2024-07-10',
    description: 'Explore the vibrant city life of NYC.',
    code: 'NYC',
  };

  beforeEach(async () => {
    const tripStoreSpy = jasmine.createSpyObj('TripStoreService', ['getTripById'], {
      trips: signal([mockTrip]).asReadonly(),
    });

    await TestBed.configureTestingModule({
      imports: [TripDetailsComponent],
      providers: [
        { provide: TripStoreService, useValue: tripStoreSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(convertToParamMap({ id: 'NYC_001' })),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TripDetailsComponent);
    component = fixture.componentInstance;
    mockTripStore = TestBed.inject(TripStoreService) as jasmine.SpyObj<TripStoreService>;
    mockTripStore.getTripById.and.returnValue(mockTrip);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load trip data based on route parameter', () => {
    expect(component.trip()).toEqual(mockTrip);
    expect(component.hasTrip()).toBe(true);
  });

  it('should return undefined when trip ID is not found', () => {
    mockTripStore.getTripById.and.returnValue(undefined);
    fixture.detectChanges();

    expect(component.hasTrip()).toBe(false);
  });
});
