import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { User } from '../models/User';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {
  isAdmin;
  constructor(private auth: AuthService) {
    this.auth.isAdmin()
      .subscribe((val: User) => {
        this.isAdmin = val.isAdmin;
      });
  }

  canActivate() {
    return this.isAdmin;
  }

}
