import { Component, OnInit, Input } from '@angular/core';
import { Booking } from '../../../models/booking';

@Component({
  selector: 'app-booking-item',
  templateUrl: './booking-item.component.html',
  styleUrls: ['./booking-item.component.css']
})
export class BookingItemComponent implements OnInit {
  @Input() booking: Booking;  // important html binding
  @Input() index: number;

  // constructor() { } ??

  ngOnInit(): void {
  }
}
