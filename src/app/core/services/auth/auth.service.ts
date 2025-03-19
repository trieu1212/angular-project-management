import { Injectable } from '@angular/core';
import {Auth, signInWithEmailAndPassword, signOut, UserCredential} from '@angular/fire/auth'
import { from, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: Auth) { }

  login(email: string, password: string): Observable<UserCredential> {
    return from((signInWithEmailAndPassword(this.auth, email, password)))
  }

  logout(): Observable<void> {
    return from(signOut(this.auth))
  }

  getCurrentUser(): Observable<any> {
    return new Observable((ob) => {
      this.auth.onAuthStateChanged(u => ob.next(u))
    })
  }

  isLoggedIn(): boolean {
    return this.auth.currentUser !== null
  }
}
