import { Routes } from '@angular/router'
import { AuthGuard } from './core/guards/auth.guard'
import { onboardingGuard } from './core/guards/onboarding.guard'
import { GuestGuard } from './core/guards/guest.guard'

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./landing/landing').then((m) => m.Landing)
  },
  {
    path: '',
    loadComponent: () => import('./layout/auth-layout/auth-layout').then((m) => m.AuthLayout),
    children: [
      {
        path: 'login',
        loadComponent: () => import('./auth/login/login').then((m) => m.Login),
        canActivate: [GuestGuard]
      },
      {
        path: 'register',
        loadComponent: () => import('./auth/register/register').then((m) => m.Register),
        canActivate: [GuestGuard]
      },
      {
        path: 'onboarding',
        loadComponent: () => import('./auth/onboarding/onboarding').then((m) => m.Onboarding),
        canActivate: [onboardingGuard]
      }
    ]
  },
  {
    path: '',
    loadComponent: () => import('./layout/main-layout/main-layout').then((m) => m.MainLayout),
    canActivateChild: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./feature/dashboard/dashboard').then((m) => m.Dashboard)
      }
    ]
  }
]
