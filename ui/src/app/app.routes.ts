import { Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { authGuard } from './guard/auth.guard';
import { LoginComponent } from './pages/account/login/login.component';
import { SignupComponent } from './pages/account/signup/signup.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/errors/not-found/not-found.component';
import { ForgotPasswordComponent } from './pages/account/forgot-password/forgot-password.component';
import { ProfileComponent } from './pages/home/profile/profile.component';
import { TripsComponent } from './pages/home/trips/trips.component';
import { TripDetailsComponent } from './pages/home/trips/trip-details/trip-details.component';

export const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },

  // App Protected Routes
  {
    path: 'app',
    component: HomeComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'trips', pathMatch: 'full' },
      { path: 'trips', component: TripsComponent },
      { path: 'trips/details/:id', component: TripDetailsComponent },
      { path: 'profile', component: ProfileComponent },
    ],
  },

  // wildcard route for a 404
  { path: '**', component: NotFoundComponent },
];
