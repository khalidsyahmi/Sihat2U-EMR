import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {

  constructor(
    private dataStorageService: DataStorageService,
  ) { }

  ngOnInit(){ 
  }

  onSaveData() {
    this.dataStorageService.storeBookings();
  }

  onFetchData() {
    this.dataStorageService.fetchBookings()
    .subscribe()
    ;
  }
}
