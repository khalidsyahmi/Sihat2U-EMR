import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

import { Booking } from 'src/app/models/booking';
import { BookingService } from '../Booking.service';
import { User } from 'src/app/auth/user.model';
import { AuthService } from 'src/app/auth/auth.service';
import { Role } from 'src/app/models/role';

@Component({
  selector: 'app-booking-detail',
  templateUrl: './booking-detail.component.html',
  styleUrls: ['./booking-detail.component.css']
})
export class BookingDetailComponent implements OnInit {
  booking: Booking; //removed @input
  id: number;
  currentUser: User;

  constructor(
              private bookingService: BookingService,
              private route: ActivatedRoute,
              private router: Router,
              private authService: AuthService,
              ) {
  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.booking = this.bookingService.getBooking(this.id);

          this.authService.currentUser.subscribe(x => this.currentUser = x); // sub instance of currentUser
        }
      );
  }

  get isAdmin() {
    return this.currentUser && this.currentUser.role === Role.Admin; //exp ngIF get function
}

  onEditBooking() {
    this.router.navigate(['edit'], {relativeTo: this.route});
    // this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});
  }

  onDeleteBooking() {
    this.bookingService.deleteBooking(this.id);
    this.router.navigate(['/booking']);
  }
}
