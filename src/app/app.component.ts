import { Component, OnInit } from '@angular/core'
import { AuthService } from './auth/auth.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'material-training'
  openSidenav = false

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // no need to unsubscribe since this is a app lifetime subscription
    this.authService.initAuthListener()
  }
}
