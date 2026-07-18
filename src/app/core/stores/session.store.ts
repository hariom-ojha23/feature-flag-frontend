import { computed, inject } from '@angular/core'
import { SessionState } from '../../shared/interfaces/session-state.interface'
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals'
import { rxMethod } from '@ngrx/signals/rxjs-interop'
import { AuthService } from '../../auth/services/auth.service'
import { SessionService } from '../../auth/services/session.service'
import { catchError, EMPTY, pipe, switchMap, tap } from 'rxjs'
import { LoginPayload, RegisterPayload } from '../../shared/interfaces/auth.interface'
import { Router } from '@angular/router'
import { ToastMessageService } from '../../shared/services/toast.service'

const initialState: SessionState = {
  user: null,
  tenant: null,
  project: null,
  availableProjects: [],
  loading: false,
  initialized: false,
  authError: null
}

export const SessionStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(({ user }) => ({ isAuthenticated: computed(() => !!user()) })),

  withMethods(
    (
      store,
      authService = inject(AuthService),
      sessionService = inject(SessionService),
      router = inject(Router),
      toast = inject(ToastMessageService)
    ) => ({
      login: rxMethod<LoginPayload>(
        pipe(
          tap(() => patchState(store, { loading: true, authError: null })),
          switchMap((payload) =>
            authService.login(payload).pipe(
              // token is saved by auth service. Here we load session data
              switchMap(() => sessionService.getSession()),
              tap(({ user, tenant, project, availableProjects }) => {
                patchState(store, { user, tenant, project, availableProjects, loading: false })

                toast.showSuccess('Success', 'Login sucessfully')

                /**
                 * if email not verified, redirect to email verification
                 * if project not created, redirect to create project
                 * else redirect to dashboard
                 */
                let query = ''
                if (!user.isEmailVerified) query = 'active=email-verification'
                else if (!project) query = 'active=create-project'

                if (query) {
                  router.navigateByUrl(`/onboarding?${query}`)
                } else {
                  router.navigateByUrl('/dashboard')
                }
              }),
              catchError((error) => {
                patchState(store, { loading: false, authError: error?.message ?? 'Login Failed' })
                return EMPTY
              })
            )
          )
        )
      ),
      register: rxMethod<RegisterPayload>(
        pipe(
          tap(() => patchState(store, { loading: true, authError: null })),
          switchMap((payload) =>
            authService.register(payload).pipe(
              // token is saved by auth service. Here we load session data
              switchMap(() => sessionService.getSession()),
              tap(({ user, tenant, project, availableProjects }) => {
                patchState(store, { user, tenant, project, availableProjects, loading: false })

                toast.showSuccess('Success', 'Registered sucessfully')

                // send user for email verification
                const query = 'active=email-verification'
                router.navigateByUrl(`/onboarding?${query}`)
              }),
              catchError((error) => {
                patchState(store, {
                  loading: false,
                  authError: error?.message ?? 'Registration Failed'
                })
                return EMPTY
              })
            )
          )
        )
      )
    })
  )
)
