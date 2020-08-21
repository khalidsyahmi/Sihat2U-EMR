import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { UAC } from '../models/uac';

@Injectable()
export class UACService {
  UACChanged = new Subject<UAC[]>(); // to reflect a subject to the corresponding array

  private accs: UAC[] = [
    new UAC(
        "Roles: ADMIN",
        "Admin's Accessability includes Editing and Deleting Patient's Application",
        "https://user-images.githubusercontent.com/35910158/35493994-36e2c50e-04d9-11e8-8b38-890caea01850.png"
      ),
    new UAC(
        "Roles: PATIENT",
        "Patients's Accessability includes Adding and Editing Applications for Treatment",
        "https://img.favpng.com/17/11/25/patient-hospital-bed-clip-art-png-favpng-72cJZM5wXzHhRVkH6WLQuqFmn.jpg"
    )
  ];

//   setBooking(uacs: UAC[]) {
//     this.accs = uacs;
//     this.UACChanged.next(this.accs.slice());
//   }

  getUseraccs() {
    return this.accs.slice();
  }

  getaUserAcc(index: number) {
    return this.accs[index];
  }

//   addBooking(Booking: Booking) {
//     this.bookings.push(Booking);
//     this.bookingsChanged.next(this.bookings.slice());
//   }

//   updateBooking(index: number, newBooking: Booking) {
//     this.bookings[index] = newBooking;
//     this.bookingsChanged.next(this.bookings.slice());
//   }

//   deleteBooking(index: number) {
//     this.bookings.splice(index, 1);
//     this.bookingsChanged.next(this.bookings.slice());
//   }

}
