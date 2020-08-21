import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Booking } from '../models/booking';
// import { Appointment } from '../models/appointment.model';
// import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class BookingService {
  bookingsChanged = new Subject<Booking[]>(); // to reflect a subject to the corresponding array

  private bookings: Booking[] = [
    // new Booking(
    //   'Tasty Schnitzel',
    //   'A super-tasty Schnitzel - just awesome!',
    //   'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
    //   '',
    //   Number(),
    //   '',
    //   '',
    //   Number(),
    //   '',

    //   )
  ];
    // private recipes: Recipe[] = [];

  // constructor(private alService: AppointmentListService) {}

  setBooking(bookings: Booking[]) {
    this.bookings = bookings;
    this.bookingsChanged.next(this.bookings.slice());
  }

  getBookings() {
    return this.bookings.slice();
  }

  getBooking(index: number) {
    return this.bookings[index];
  }

  // addAppointmentsToAppointmentList(appointments: Appointment[]) {
  //   this.alService.addIngredients(appointments);
  // }

  addBooking(Booking: Booking) {
    this.bookings.push(Booking);
    this.bookingsChanged.next(this.bookings.slice());
  }

  updateBooking(index: number, newBooking: Booking) {
    this.bookings[index] = newBooking;
    this.bookingsChanged.next(this.bookings.slice());
  }

  deleteBooking(index: number) {
    this.bookings.splice(index, 1);
    this.bookingsChanged.next(this.bookings.slice());
  }
}
