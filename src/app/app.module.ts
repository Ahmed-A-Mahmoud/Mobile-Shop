import { DropdownDirective } from './Shared/dropdownToggler.directive';
import { FIREBASE_CONFIG } from './../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { RouterModule, Routes } from '@angular/router'
import { AngularFireModule } from 'angularfire2'
import { AngularFireDatabaseModule } from 'angularfire2/database'
import { AppComponent } from './app.component';
import { HeaderComponent } from './Header/header.component';
import { SmartphonesThumbnailsComponent } from './Smartphones/smartphones-thumbnails/smartphones-thumbnails.component';
import { SmartphoneDetailsComponent } from './Smartphones/smartphone-details/smartphone-details.component';
import { SharingService } from './Services/SharingService.service';
import { LoginRegisterFormComponent } from './Login-RegisterForm/login-register-form.component';
import { ProfileComponent } from './Profile/profile.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule,MatCheckboxModule} from '@angular/material';

const appRoutes: Routes = [
  { path: '', component: SmartphonesThumbnailsComponent },
  { path: 'details', component: SmartphoneDetailsComponent },
  { path: 'login-register/:tab', component: LoginRegisterFormComponent },
  { path: 'profile', component: ProfileComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SmartphonesThumbnailsComponent,
    SmartphoneDetailsComponent,
    DropdownDirective,
    LoginRegisterFormComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireDatabaseModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatCheckboxModule
  ],
  providers: [SharingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
