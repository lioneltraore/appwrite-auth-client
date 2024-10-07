// import { User } from 'src/app/models/user';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, from, map, Observable, of, shareReplay, tap } from 'rxjs';
// import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { AppwriteService } from './appwrite.service';
import { Models } from 'appwrite';

export const AUTH_DATA = 'authData';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userSubject = new BehaviorSubject<Models.User<Models.Preferences>|undefined>(undefined);
  user$ = this.userSubject.asObservable();
  isLoggedIn$!: Observable<boolean>;
  isLoggedOut$!: Observable<boolean>;

  http = inject(HttpClient);
  appwriteService = inject(AppwriteService);

  constructor() {
    this.isLoggedIn$ = this.user$.pipe(map(user => !!user));
    this.isLoggedOut$ = this.isLoggedIn$.pipe(map(loggedIn => !loggedIn));

    const user = localStorage.getItem(AUTH_DATA);
    if(user) {
      this.userSubject.next(JSON.parse(user));
    }
  }

  register(email: string, password: string) {
    return from(this.appwriteService.createAccount(email, password)).pipe(
      shareReplay()
    );
  }

  login(email: string, password: string): Observable<Models.User<Models.Preferences>> {
    return from(this.appwriteService.authenticate(email, password)).pipe(
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
    this.appwriteService.closeSession();
  }
}
