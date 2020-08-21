import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { BookingService } from '../Booking.service';
import { Booking } from '../../models/booking';

@Component({
  selector: 'app-booking-list',
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.css']
})
export class BookingListComponent implements OnInit, OnDestroy {
  bookings: Booking[];
  subscription: Subscription;

  constructor(
    private bookingService: BookingService,
              private router: Router,
              private route: ActivatedRoute
              ) {
  }

  ngOnInit() {
    this.subscription = this.bookingService.bookingsChanged
      .subscribe(
        (bookings: Booking[]) => {
          this.bookings = bookings;
        }
      );
    this.bookings = this.bookingService.getBookings();
  }

  onNewBooking() { 
    this.router.navigate(['new'], {relativeTo: this.route}); // assign new route in <router outlet in route page>
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
