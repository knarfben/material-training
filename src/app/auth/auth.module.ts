import { NgModule } from '@angular/core'
import { SignupComponent } from './signup/signup.component'
import { LoginComponent } from './login/login.component'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MaterialModule } from '../material.module'
import { FlexLayoutModule } from '@angular/flex-layout'
import { LoginReactiveComponent } from './login-reactive/login-reactive.component'
import { AngularFireAuthModule } from 'angularfire2/auth'

@NgModule({
  declarations: [SignupComponent, LoginComponent, LoginReactiveComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    AngularFireAuthModule
  ],
  exports: []
})
export class AuthModule {}
