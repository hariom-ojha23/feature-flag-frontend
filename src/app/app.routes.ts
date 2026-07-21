import { Routes } from '@angular/router'
import { Login } from './auth/login/login'
import { Register } from './auth/register/register'
import { AuthLayout } from './layout/auth-layout/auth-layout'
import { MainLayout } from './layout/main-layout/main-layout'
import { Onboarding } from './auth/onboarding/onboarding'
import { Dashboard } from './feature/dashboard/dashboard'
import { AuthGuard } from './core/guards/auth.guard'
import { onboardingGuard } from './core/guards/onboarding.guard'
import { GuestGuard } from './core/guards/guest.guard'
import { Landing } from './feature/landing/landing'

export const routes: Routes = [
  { path: '', component: Landing },
  {
    path: '',
    component: AuthLayout,
    children: [
      { path: 'login', component: Login, canActivate: [GuestGuard] },
      { path: 'register', component: Register, canActivate: [GuestGuard] },
      { path: 'onboarding', component: Onboarding, canActivate: [onboardingGuard] }
    ]
  },
  {
    path: '',
    component: MainLayout,
    canActivateChild: [AuthGuard],
    children: [{ path: 'dashboard', component: Dashboard }]
  }
]
