import { Component, OnInit, OnDestroy } from '@angular/core'
import { NgForm } from '@angular/forms'
import { AuthService } from '../auth.service'
import { Observable } from 'rxjs'
import { Store } from '@ngrx/store'
import * as fromRoot from '../../app.reducer'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  spinMe$: Observable<boolean>

  constructor(
    private store: Store<fromRoot.State>,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.spinMe$ = this.store.select(fromRoot.getIsLoading)
  }

  onSubmit(form: NgForm) {
    this.authService.login({
      email: form.value.emailInput,
      password: form.value.passwordInput
    })
  }
}
