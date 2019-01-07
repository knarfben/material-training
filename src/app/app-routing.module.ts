import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { WelcomeComponent } from './welcome/welcome.component'
import { LoginReactiveComponent } from './auth/login-reactive/login-reactive.component'
import { AuthGuard } from './auth/auth.guard'

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'login-reactive', component: LoginReactiveComponent },
  {
    path: 'training',
    loadChildren: './src/app'
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}
