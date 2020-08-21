import { Component, OnInit } from '@angular/core';
import { UAC } from 'src/app/models/uac';
import { User } from 'src/app/auth/user.model';
import { UACService } from 'src/app/shared/uac.service';

@Component({
  selector: 'app-regular-user',
  templateUrl: './regular-user.component.html',
  styleUrls: ['./regular-user.component.css']
})
export class RegularUserComponent implements OnInit {

  booking: UAC;
  id: number=(1);

  currentUser: User;


  constructor(
    private uacService: UACService,
  ) { }

  ngOnInit() {

    this.booking = this.uacService.getaUserAcc(this.id);


  }
}
