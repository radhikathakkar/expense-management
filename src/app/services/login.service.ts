import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class LoginService {


  constructor(private afAuth: AngularFireAuth) { }

  login = async (username, password) => {
    this.afAuth.auth.signInWithEmailAndPassword(username, password)
    .then(res => res)
    .catch(err => err);
  }

  logout = async () => {
    this.afAuth.auth.signOut();
  }

  googleLogin = async () => {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.afAuth.auth.signInWithPopup(provider);
    return credential;
  }
}
