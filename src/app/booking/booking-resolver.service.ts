import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';

import { DataStorageService } from '../shared/data-storage.service';
import { Booking } from '../models/booking';
import { BookingService } from './Booking.service';

@Injectable({ providedIn: 'root' })
export class BookingsResolverService implements Resolve<Booking[]> {
  constructor(
    private dataStorageService: DataStorageService,
    private bookingsService: BookingService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const bookings = this.bookingsService.getBookings();

    if (bookings.length === 0) {
      return this.dataStorageService.fetchBookings();
    } else {
      return bookings;
    }
  }
}


//resolver is to prevent reload error of data not fetched from a server