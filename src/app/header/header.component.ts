import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';
import { Role } from '../models/role';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private userSub: Subscription;
  isAuthenticated = false;
  currentUser: User; // model instance

  constructor(
    private dataStorageService: DataStorageService,
    private authService: AuthService
  ) {} 

  ngOnInit(){ 
    this.userSub = this.authService.user.subscribe(user =>{
      this.isAuthenticated = !!user;
      console.log(!user);
      console.log(!!user);

      this.authService.currentUser.subscribe(x => this.currentUser = x); // sub instance of currentUser

      this.dataStorageService.fetchBookings().subscribe();
    });

  }

  get isAdmin() {
    return this.currentUser && this.currentUser.role === Role.Admin; //exp ngIF get function
}

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
