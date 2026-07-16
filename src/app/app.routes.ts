import { Routes } from '@angular/router'
import { Login } from './auth/login/login'
import { Register } from './auth/register/register'
import { AuthLayout } from './layout/auth-layout/auth-layout'
import { MainLayout } from './layout/main-layout/main-layout'
import { Onboarding } from './auth/onboarding/onboarding'

export const routes: Routes = [
  {
    path: '',
    component: AuthLayout,
    children: [
      { path: 'login', component: Login },
      { path: 'register', component: Register },
      { path: 'onboarding', component: Onboarding },
    ]
  },
  {
    path: '',
    component: MainLayout,
    children: []
  }
]
