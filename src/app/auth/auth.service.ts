import { AuthData } from './auth-data.model'
import { User } from './user.model'
import { Subject } from 'rxjs'
import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { AngularFireAuth } from 'angularfire2/auth'
import { TrainingService } from 'src/app/training/training.service'
import { MatSnackBar } from '@angular/material'
import { UIService } from '../shared/ui.service'

@Injectable()
export class AuthService {
  authChange = new Subject<boolean>()
  private isAuthenticated = false

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private traininService: TrainingService,
    private snackbar: MatSnackBar,
    private uiService: UIService
  ) {}

  initAuthListener() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.isAuthenticated = true
        this.authChange.next(true)
        this.router.navigate(['/training'])
      } else {
        this.traininService.cancelSubscriptions()
        this.isAuthenticated = false
        this.authChange.next(false)
        this.router.navigate(['/login'])
      }
    })
  }
  registerUser(authData: AuthData) {
    this.uiService.loadingStateChanged.next(true)
    this.afAuth.auth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        this.uiService.loadingStateChanged.next(false)
      })
      .catch(error => {
        this.uiService.loadingStateChanged.next(false)
        this.snackbar.open(error.message, null, {
          duration: 3000
        })
      })
  }

  login(authData: AuthData) {
    this.uiService.loadingStateChanged.next(true)
    this.afAuth.auth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        this.uiService.loadingStateChanged.next(false)
      })
      .catch(error => {
        this.uiService.loadingStateChanged.next(false)
        this.snackbar.open(error.message, null, {
          duration: 3000
        })
      })
  }

  logout() {
    this.afAuth.auth.signOut()
  }

  isAuth() {
    return this.isAuthenticated
  }
}
