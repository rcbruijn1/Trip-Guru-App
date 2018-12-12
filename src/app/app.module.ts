import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';
import {HttpModule} from '@angular/http';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { FlashMessagesModule} from 'angular2-flash-messages';


import { AppComponent } from './app.component';
import { DiscoveryComponent } from './discovery/discovery.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SearchComponent } from './search/search.component';
import { CityComponent } from './city/city.component';
import { CityLocationsComponent } from './city/city-locations/city-locations.component';
import { LoginComponent} from './user/login/login.component';
import { RegisterComponent} from './user/register/register.component';
import { ProfileComponent} from './user/profile/profile.component';


import { ValidateService} from './services/validate.service';
import { AuthService} from './services/auth.service';
import { CityService} from './services/city.service';

import {AuthGuard} from './guards/auth.guard';
import { AuthAdminGuard } from './guards/auth-admin.guard';
import { AdminComponent } from './user/admin/admin.component';
import { JourneyComponent } from './journey/journey.component';


const appRoutes : Routes = [
  { path: '', component: DashboardComponent},
  { path:'discovery', component: DiscoveryComponent},
  { path:'journey', component: JourneyComponent, canActivate:[AuthGuard]},
  { path:'city/:id', component: CityComponent},
  { path: 'user/login', component: LoginComponent},
  { path: 'user/register', component: RegisterComponent},
  { path: 'user/profile', component: ProfileComponent, canActivate:[AuthGuard]},
  { path: 'admin', component: AdminComponent, canActivate:[AuthAdminGuard]}

];

@NgModule({
  declarations: [
    AppComponent,
    DiscoveryComponent,
    DashboardComponent,
    SearchComponent,
    CityComponent,
    CityLocationsComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    AdminComponent,
    JourneyComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    HttpModule,
    AngularFontAwesomeModule,
    FlashMessagesModule.forRoot()
  ],
  providers: [ValidateService, AuthService, AuthGuard, CityService],
  bootstrap: [AppComponent]
})
export class AppModule { }
