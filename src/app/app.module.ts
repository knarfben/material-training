import { BrowserModule } from '@angular/platform-browser'
import { LOCALE_ID, NgModule } from '@angular/core'
import { FlexLayoutModule } from '@angular/flex-layout'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MaterialModule } from './material.module'
import { WelcomeComponent } from './welcome/welcome.component'
import { HeaderComponent } from './navigation/header/header.component'
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component'
import { AuthService } from './auth/auth.service'
import { TrainingService } from './training/training.service'
import { AngularFireModule } from 'angularfire2'
import { environment } from '../environments/environment'
import { UIService } from './shared/ui.service'
import { AuthModule } from './auth/auth.module'
import { AngularFirestoreModule } from 'angularfire2/firestore'
import { ConfigService } from './shared/config.service'
import { BasicDialogComponent } from './basic-dialog/basic-dialog.component'
import { FormsModule } from '@angular/forms'
import { StoreModule } from '@ngrx/store'
import { reducers } from './app.reducer'

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    HeaderComponent,
    SidenavListComponent,
    BasicDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    AngularFireModule.initializeApp(environment.firebase),
    AuthModule,
    AngularFirestoreModule,
    FormsModule,
    StoreModule.forRoot(reducers)
  ],
  entryComponents: [BasicDialogComponent],
  providers: [AuthService, TrainingService, UIService, ConfigService],
  bootstrap: [AppComponent]
})
export class AppModule {}
