import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import {AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthAdminGuard implements CanActivate {

  constructor(private authService : AuthService, private router : Router){

  }

  canActivate()
     {
      if(this.authService.isAdmin() && this.authService.loggedIn()){
        return true;
      }else{
        this.router.navigate(['/user/login']);
        return false;
      }
  }
}
