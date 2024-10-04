import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of, shareReplay, tap } from 'rxjs';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';

const AUTH_DATA = 'authData';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userSubject = new BehaviorSubject<User|undefined>(undefined);
  user$ = this.userSubject.asObservable();
  isLoggedIn$!: Observable<boolean>;
  isLoggedOut$!: Observable<boolean>;

  http = inject(HttpClient);

  constructor() {
    this.isLoggedIn$ = this.user$.pipe(map(user => !!user));
    this.isLoggedOut$ = this.isLoggedIn$.pipe(map(loggedIn => !loggedIn));

    const user = localStorage.getItem(AUTH_DATA);
    if(user) {
      this.userSubject.next(JSON.parse(user));
    }
  }

  login(email: string, password: string): Observable<User> {
    // make http request to login endpoint

    const user: User = { email, password };

    return of(user).pipe(
      tap(user => {
        this.userSubject.next(user);
        localStorage.setItem(AUTH_DATA, JSON.stringify(user));
      }),
      shareReplay()
    );
  }

  logout() {
    this.userSubject.next(undefined);
    localStorage.removeItem(AUTH_DATA);
  }
}
