import { AuthData } from "./auth-data.model"
import { User } from "./user.model"
import { Subject } from "rxjs"
import { Injectable } from "@angular/core"
import { Router } from "@angular/router"

@Injectable()
export class AuthService {
  authChange = new Subject<boolean>()
  private user: User

  constructor(private router: Router) {}

  private onSuccessfulLogin() {
    this.authChange.next(true)
    this.router.navigate(["/training"])
  }

  registerUser(authData: AuthData) {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 10000).toString()
    }
    this.onSuccessfulLogin()
  }

  login(authData: AuthData) {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 10000).toString()
    }
    this.onSuccessfulLogin()
  }

  logout() {
    this.user = null
    this.authChange.next(false)
    this.router.navigate(["/login"])
  }

  getUser() {
    return { ...this.user }
  }

  isAuth() {
    return this.user != null
  }
}
