import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { BookingTableDataSource,  } from './booking-table-datasource';
import { Booking } from '../models/booking';
import { BookingService } from '../booking/Booking.service';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-booking-table',
  templateUrl: './booking-table.component.html',
  styleUrls: ['./booking-table.component.css']
})
export class BookingTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<Booking>;
  dataSource: BookingTableDataSource;

  constructor(
    private bookingService: BookingService, //changes
    // private route: ActivatedRoute,
    // private router: Router,
  ) {}

  subscription: Subscription;
  bookings: Booking[];

  // id: number;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = [
    // 'id', 
    'name', 
    'description',
    'phone',
  ];

  ngOnInit() {
    this.subscription = this.bookingService.bookingsChanged  //get all arrau booking
      .subscribe(
        (bookings: Booking[]) => {
          this.bookings = bookings;
        }
      );
    this.bookings = this.bookingService.getBookings();

    this.dataSource = new BookingTableDataSource(this.bookings);
    
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;

  }
}
