import { Component, OnInit, OnDestroy } from '@angular/core'
import { NgForm } from '@angular/forms'
import { AuthService } from '../auth.service'
import { Subscription } from 'rxjs'
import { UIService } from 'src/app/shared/ui.service'
import { Store } from '@ngrx/store'
import * as fromApp from '../../app.reducer'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  spinMe = false
  private dataLoadingSubscription: Subscription

  constructor(
    private store: Store<{ ui: fromApp.State }>,
    private authService: AuthService,
    private uiService: UIService
  ) {}

  ngOnInit() {
    this.store.subscribe(data => console.log(data))
    this.dataLoadingSubscription = this.uiService.loadingStateChanged.subscribe(
      loading => {
        this.spinMe = loading
      }
    )
  }

  ngOnDestroy(): void {
    if (this.dataLoadingSubscription) {
      this.dataLoadingSubscription.unsubscribe()
    }
  }

  onSubmit(form: NgForm) {
    this.authService.login({
      email: form.value.emailInput,
      password: form.value.passwordInput
    })
  }
}
