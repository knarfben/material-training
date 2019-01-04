import { Component, OnInit, OnDestroy } from '@angular/core'
import { NgForm } from '@angular/forms'
import { AuthService } from '../auth.service'
import { Subscription } from 'rxjs'
import { UIService } from 'src/app/shared/ui.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  spinMe = false
  private dataLoadingSubscription: Subscription

  constructor(private authService: AuthService, private uiService: UIService) {}

  ngOnInit() {
    this.dataLoadingSubscription = this.uiService.loadingStateChanged.subscribe(
      loading => {
        this.spinMe = loading
      }
    )
  }

  ngOnDestroy(): void {
    this.dataLoadingSubscription.unsubscribe()
  }

  onSubmit(form: NgForm) {
    this.authService.login({
      email: form.value.emailInput,
      password: form.value.passwordInput
    })
  }
}
