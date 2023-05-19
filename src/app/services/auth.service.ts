import { Injectable } from '@angular/core';
import { GoogleAuthProvider } from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat';
import { HttpClient } from '@angular/common/http';

import { Route, Router } from '@angular/router';
import { GoogleLogin } from '../Models';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    public afAuth: AngularFireAuth,
    private router: Router
  ) // Inject Firebase auth service
  {}

  googleLogin() {
    return this.afAuth.signInWithPopup(new GoogleAuthProvider()).then(
      (res) => {
        const email = res.user?.email;
        const name = res.user?.displayName;

        if (email && name) {
          this.http
            .get<GoogleLogin[]>(`http://localhost:3000/users?email=${email}`, {
              observe: 'response',
            })
            .subscribe((result) => {
              if (result && result.body?.length) {
                // user is already registered, log them in
                this.router.navigate(['/']);
                localStorage.setItem('user', JSON.stringify(result.body[0]));
              } else {
                // user is not registered, save them in database
                const newUser: GoogleLogin = { name, email };
                this.http
                  .post<GoogleLogin>('http://localhost:3000/users', newUser)
                  .subscribe((newUser) => {
                    localStorage.setItem('user', JSON.stringify(newUser));
                    this.router.navigate(['/']);
                  });
              }
              localStorage.setItem('token', JSON.stringify(res.user?.uid));
            });
        } else {
          // Handle the case where name or email is null or undefined
          console.error('Failed to retrieve name or email from Google user');
        }
      },
      (err) => {
        alert(err.message);
      }
    );
  }

  // Sign in with Google
  GoogleAuth() {
    {
      return this.afAuth.signInWithPopup(new GoogleAuthProvider()).then(
        (res) => {
          this.router.navigate(['/']);
          localStorage.setItem('token', JSON.stringify(res.user?.uid));
        },
        (err) => {
          alert(err.message);
        }
      );
    }
    // Auth logic to run auth providers
  }
}

function googleSignIn() {
  throw new Error('Function not implemented.');
}
