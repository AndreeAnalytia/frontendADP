
import 'reflect-metadata';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import authAPI from '../app/services/auth.service';
const auth=new authAPI();
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private routes: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (window.localStorage.getItem('iduser') !== null) {
      return true;
    } else {
      auth.signout();
      this.routes.navigate(['/authentication/side-login']);
      return false;
    }
  }
}