import { inject } from '@angular/core'
import { CanActivateFn, Router } from '@angular/router'
import { SessionStore } from '../stores/session.store'
import { toObservable } from '@angular/core/rxjs-interop'
import { filter, take, map } from 'rxjs'

export const GuestGuard: CanActivateFn = () => {
  const session = inject(SessionStore)
  const router = inject(Router)

  return toObservable(session.initialized).pipe(
    filter((initialized) => initialized),
    take(1),
    map(() => {
      if (!session.isAuthenticated()) {
        return true // - not logged in -> ok
      }

      const user = session.user()
      const project = session.project()
      const needsOnboarding = !user?.isEmailVerified || !project

      return needsOnboarding ? router.parseUrl('/onboarding') : router.parseUrl('/dashboard')
    })
  )
}
