import { Component, OnInit } from "@angular/core"
import { FormGroup, FormControl, Validators } from "@angular/forms"
import { AuthService } from "../auth.service"

@Component({
  selector: "app-login-reactive",
  templateUrl: "./login-reactive.component.html",
  styleUrls: ["./login-reactive.component.scss"]
})
export class LoginReactiveComponent implements OnInit {
  loginForm: FormGroup
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      emailElement: new FormControl("", {
        validators: [Validators.required, Validators.email]
      }),
      passwordElement: new FormControl("", {
        validators: [Validators.required]
      })
    })
  }

  onSubmit() {
    this.authService.login({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    })
  }
}
