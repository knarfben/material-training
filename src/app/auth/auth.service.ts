import { AuthData } from './auth-data.model'
import { User } from './user.model'
import { Subject } from 'rxjs'
import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { AngularFireAuth } from 'angularfire2/auth'

@Injectable()
export class AuthService {
  authChange = new Subject<boolean>()
  private isAuthenticated = false

  constructor(private router: Router, private afAuth: AngularFireAuth) {}

  private onSuccessfulLogin() {
    this.isAuthenticated = true
    this.authChange.next(true)
    this.router.navigate(['/training'])
  }

  registerUser(authData: AuthData) {
    this.afAuth.auth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        console.log(result)
        this.onSuccessfulLogin()
      })
      .catch(error => {
        console.log(error)
      })
  }

  login(authData: AuthData) {
    console.log(authData)

    this.afAuth.auth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        console.log(result)
        this.onSuccessfulLogin()
      })
      .catch(error => {
        console.log(error)
      })
  }

  logout() {
    this.isAuthenticated = false
    this.authChange.next(false)
    this.router.navigate(['/login'])
  }

  isAuth() {
    return this.isAuthenticated
  }
}
