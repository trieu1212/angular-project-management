import { Injectable } from '@angular/core';
import {Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, User, user, UserCredential} from '@angular/fire/auth'
import { from, Observable } from 'rxjs';
import { Database, ref, set } from '@angular/fire/database'
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: Auth, private db: Database, private router: Router) { }

  register(name: string, email: string, password: string): Observable<void> {
    return from(
      createUserWithEmailAndPassword(this.auth, email, password).then((userCredential) => {
        const userId = userCredential.user.uid
        return set(
          ref(this.db, 'users/' + userId),
          {
            id: userId,
            name: name,
            email: email,
            password: password,
            createdAt: new Date().toISOString()
          }
        )
      })
    )
  }
  login(email: string, password: string): Observable<UserCredential> {
    return from(
      (signInWithEmailAndPassword(this.auth, email, password))
    )
  }

  logout(): Observable<void> {
    return from(
      signOut(this.auth).then(() => {
        this.router.navigate(['/login'])
      })
    )
  }

  getCurrentUser(): Observable<User | null> {
    return user(this.auth)
  }

  isLoggedIn(): boolean {
    return this.auth.currentUser !== null
  }
}
