import { inject } from '@angular/core'
import { toObservable } from '@angular/core/rxjs-interop'
import { CanActivateFn, Router } from '@angular/router'
import { SessionStore } from '../stores/session.store'
import { filter, take, map } from 'rxjs'

export const onboardingGuard: CanActivateFn = () => {
  const session = inject(SessionStore)
  const router = inject(Router)

  return toObservable(session.initialized).pipe(
    filter((i) => i),
    take(1),
    map(() => {
      if (!session.isAuthenticated()) return router.parseUrl('/login')

      const user = session.user()
      const project = session.project()
      const stillNeedsOnboarding = !user?.isEmailVerified || !project

      return stillNeedsOnboarding ? true : router.parseUrl('/dashboard')
    })
  )
}
