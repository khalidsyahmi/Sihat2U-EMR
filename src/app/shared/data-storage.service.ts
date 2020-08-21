import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, tap, take, exhaustMap } from 'rxjs/operators';

import { BookingService } from '../booking/Booking.service';
import { Booking } from '../models/booking';
import { AuthService } from '../auth/auth.service';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(private http: HttpClient, private bookingService: BookingService, private authService: AuthService) {}

  storeBookings() {
    const bookings = this.bookingService.getBookings();
    this.http
      .put(
        'https://httptest-149d0.firebaseio.com/Bookings.json',   // the json name determines the filename in rt database
        bookings
      )
      .subscribe(response => {
        console.log(response);
      });
  }

  fetchBookings() {
   return this.authService.user.pipe(take(1), 
    exhaustMap(user => {
      return this.http
      .get<Booking[]>(
        'https://httptest-149d0.firebaseio.com/Bookings.json',
        {
          params: new HttpParams().set('auth', user.token)  // add token to request
        }
      )

    }),
    tap(bookings => {
      this.bookingService.setBooking(bookings);  //dunno why but tap is must to move subscribe() to header component
    }));


    // .subscribe(); // take 1 user and unsub();

      // .subscribe(bookings => {
      //   this.bookingService.setBooking(bookings);
      // })

      // .pipe(
      //   // map(bookings => {
      //   //   return bookings.map(booking => {
      //   //     return {
      //   //       ...recipe,
      //   //       ingredients: recipe.ingredients ? recipe.ingredients : []
      //   //     };
      //   //   });
      //   // })
      //   // ,
      //   tap(bookings => {
      //     this.bookingService.setBooking(bookings);  //dunno why but tap is must to move subscribe() to header component
      //   })
      // )

      //to trail empty array of other services even if its empty
  }
}
