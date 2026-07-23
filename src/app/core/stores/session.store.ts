import { computed, inject } from '@angular/core'
import { SessionState } from './interfaces/session-state.interface'
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals'
import { rxMethod } from '@ngrx/signals/rxjs-interop'
import { AuthService } from '../../auth/services/auth.service'
import { SessionService } from '../../auth/services/session.service'
import { catchError, EMPTY, pipe, switchMap, tap } from 'rxjs'
import { LoginPayload, RegisterPayload } from '../../auth/interfaces/auth.interface'
import { Router } from '@angular/router'
import { ToastMessageService } from '../../shared/services/toast.service'
import { Error } from '../../shared/interfaces/error.interface'
import { TokenService } from '../../auth/services/token.service'
import { OnboardingService } from '../../auth/services/onboarding.service'
import { Project, ProjectPayload } from '../../feature/project/interfaces/project.interface'

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
      onboardingService = inject(OnboardingService),
      sessionService = inject(SessionService),
      tokenService = inject(TokenService),
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
                 * if email not verified or project not created,
                 * redirect to onboard page
                 * else redirect to dashboard
                 */

                if (!user.isEmailVerified || !project) {
                  router.navigate(['/onboarding'])
                } else {
                  router.navigate(['/dashboard'])
                }
              }),
              catchError((error: Error) => {
                toast.showError(error.error?.error, error.error?.message)
                patchState(store, {
                  loading: false,
                  authError: error?.error?.message ?? 'Login Failed'
                })
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

                // send user for email verification and project creation
                router.navigate(['/onboarding'])
              }),
              catchError((error: Error) => {
                toast.showError(error.error?.error, error.error?.message)
                patchState(store, {
                  loading: false,
                  authError: error?.error?.message ?? 'Registration Failed'
                })
                return EMPTY
              })
            )
          )
        )
      ),
      logout: rxMethod<void>(
        pipe(
          switchMap(() =>
            authService.logout().pipe(
              tap(() => {
                patchState(store, initialState)
                toast.showSuccess('Success', 'Logout sucessfully')
                router.navigate(['/login'])
              }),
              catchError((error) => {
                toast.showError(error.error?.error, error.error?.message)
                patchState(store, initialState)
                return EMPTY
              })
            )
          )
        )
      ),
      resendEmailVerifyCode: rxMethod<void>(
        pipe(
          tap(() => patchState(store, { loading: true, authError: null })),
          switchMap(() => onboardingService.resendEmailVerifyCode()),
          tap(({ success, message }) => {
            patchState(store, { loading: false })
            if (success) {
              toast.showSuccess('Success', message)
            }
          }),
          catchError((error: Error) => {
            toast.showError(error.error?.error, error.error?.message)
            patchState(store, { loading: false, authError: error.error?.message })
            return EMPTY
          })
        )
      ),
      verifyEmail: rxMethod<string>(
        pipe(
          tap(() => patchState(store, { loading: true, authError: null })),
          switchMap((payload) => onboardingService.verifyEmail(payload)),
          tap(({ success, message }) => {
            if (success) {
              toast.showSuccess('Success', message)
              const user = store.user()
              patchState(store, {
                loading: false,
                user: user ? { ...user, isEmailVerified: true } : user
              })
            } else {
              patchState(store, { loading: false })
            }
          }),
          catchError((error: Error) => {
            toast.showError(error.error?.error, error.error?.message)
            patchState(store, { loading: false, authError: error.error?.message })
            return EMPTY
          })
        )
      ),
      createFirstProject: rxMethod<ProjectPayload>(
        pipe(
          tap(() => patchState(store, { loading: true, authError: null })),
          switchMap((payload) =>
            onboardingService.addFirstProject(payload).pipe(
              tap((project: Project) => {
                patchState(store, {
                  loading: false,
                  project: project,
                  availableProjects: [...store.availableProjects(), project]
                })

                toast.showSuccess('Success', 'Project created successfully')
              }),
              catchError((error: Error) => {
                toast.showError(error.error?.error, error.error?.message)
                patchState(store, {
                  loading: false,
                  authError: error.error?.message ?? 'Project creation failed'
                })
                return EMPTY
              })
            )
          )
        )
      ),
      rehydrate: rxMethod<void>(
        pipe(
          switchMap(() => {
            if (!tokenService.hasToken()) {
              patchState(store, { initialized: true })
              return EMPTY
            }

            patchState(store, { loading: true })

            const activeProjectId = store.project()?.id
            return sessionService.getSession(activeProjectId).pipe(
              tap(({ user, tenant, project, availableProjects }) => {
                patchState(store, {
                  user,
                  tenant,
                  project,
                  availableProjects,
                  loading: false,
                  initialized: true
                })
              }),
              catchError((error: Error) => {
                // token invalid/expired — clear it and reset
                tokenService.removeToken()
                patchState(store, { ...initialState, initialized: true })
                return EMPTY
              })
            )
          })
        )
      )
    })
  )
)
