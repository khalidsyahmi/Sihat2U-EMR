import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { User } from '../auth/user.model';
import { Role } from '../models/role';
import { AuthService } from '../auth/auth.service';


@Component({
  selector: 'app-user-accountpage',
  templateUrl: './user-accountpage.component.html',
  styleUrls: ['./user-accountpage.component.css']
})
export class UserAccountpageComponent implements OnInit {

  private userSub: Subscription;
  currentUser: User; // model instance

  constructor(
   private router: Router, 
   private route: ActivatedRoute,
   private authService: AuthService
  ) {}

  ngOnInit(){ 
    this.userSub = this.authService.user.subscribe(user =>{

      this.authService.currentUser.subscribe(x => this.currentUser = x); // sub instance of currentUser

        if (this.currentUser.role === Role.Admin){
          this.ontoAdmin();
        } 
        else if(this.currentUser.role === Role.User){
          this.ontoNormal();
        }   

    });
  }

  ontoAdmin() { 
    this.router.navigate(['adminrole'], {relativeTo: this.route}); // assign new route in <router outlet in route page>
  }

  ontoNormal() { 
    this.router.navigate(['normalrole'], {relativeTo: this.route}); // assign new route in <router outlet in route page>
  }

}
