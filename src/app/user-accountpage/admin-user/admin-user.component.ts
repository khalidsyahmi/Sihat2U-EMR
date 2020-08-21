import { Component, OnInit, Input } from '@angular/core';
// import { Subscription } from 'rxjs';
import { UAC } from '../../models/uac';
import { UACService } from '../../shared/uac.service';
import { User } from 'src/app/auth/user.model';

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.css']
})
export class AdminUserComponent implements OnInit {

  booking: UAC; 
  id: number=(0);

  currentUser: User;


  constructor(
    private uacService: UACService,
  ) { }

  ngOnInit() {

    this.booking = this.uacService.getaUserAcc(this.id);


  }

}
