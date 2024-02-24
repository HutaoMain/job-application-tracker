import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  UrlTree,
} from '@angular/router';
import { Observable, catchError, map, of } from 'rxjs';
import { AuthService } from './service/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(private authService: AuthService, private router: Router) {}
  // canActivate(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot
  // ):
  //   | Observable<boolean | UrlTree>
  //   | Promise<boolean | UrlTree>
  //   | boolean
  //   | UrlTree {
  //   return this.authService.getTokenAndUser(route.queryParams['code']).pipe(
  //     map(() => true),
  //     catchError(() => {
  //       // Use of to create an Observable from the UrlTree
  //       return of(this.router.createUrlTree(['/login']));
  //     })
  //   );
  // }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | import('rxjs').Observable<boolean> | Promise<boolean> {
    const storedEmail = localStorage.getItem('email');

    if (storedEmail) {
      return this.authService.validateEmail(storedEmail).pipe(
        map((isValid) => {
          if (isValid) {
            return true; // Allow access if the email is valid
          } else {
            this.router.navigate(['/login']); // Redirect to login if the email is not valid
            return false;
          }
        }),
        catchError((error) => {
          console.error('Error validating email:', error);
          this.router.navigate(['/login']); // Redirect to login on error
          return of(false);
        })
      );
    } else {
      this.router.navigate(['/login']); // Redirect to login if email is not found in localStorage
      return false;
    }
  }
}
