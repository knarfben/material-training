import { Component, OnInit, OnDestroy } from '@angular/core'
import { NgForm } from '@angular/forms'
import { AuthService } from '../auth.service'
import { UIService } from 'src/app/shared/ui.service'
import { Subscription, Observable } from 'rxjs'
import * as fromRoot from '../../app.reducer'
import { Store } from '@ngrx/store'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  maxDate: Date
  spinMe$: Observable<boolean>

  constructor(
    private authService: AuthService,
    private store: Store<fromRoot.State>
  ) {}

  ngOnInit() {
    this.spinMe$ = this.store.select(fromRoot.getIsLoading)
    this.maxDate = new Date()
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18)
  }

  onSubmit(form: NgForm) {
    this.authService.registerUser({
      email: form.value.email,
      password: form.value.password
    })
  }
}
