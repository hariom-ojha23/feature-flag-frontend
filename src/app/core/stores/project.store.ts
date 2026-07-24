import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals'
import { Project, ProjectPayload } from '../../feature/project/interfaces/project.interface'
import { ProjectsState } from './interfaces/project-state.interface'
import { computed, inject } from '@angular/core'
import { ProjectStatus } from '../../shared/enums/project.enum'
import { ProjectService } from '../../feature/project/services/project.service'
import { ToastMessageService } from '../../shared/services/toast.service'
import { rxMethod } from '@ngrx/signals/rxjs-interop'
import { catchError, EMPTY, pipe, switchMap, tap } from 'rxjs'
import { Error } from '../../shared/interfaces/error.interface'
import { PlanType } from '../../shared/enums/plan-type.enum'
import { PLAN_PROJECT_LIMITS } from '../../shared/config/plan-limits'

const initialState: ProjectsState = {
  projects: [],
  loading: false,
  error: null
}

export const ProjectStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),

  withComputed(({ projects }) => ({
    activeProjects: computed(() => projects().filter((p) => p.status === ProjectStatus.ACTIVE)),
    archivedProjects: computed(() => projects().filter((p) => p.status === ProjectStatus.ARCHIVED)),
    suspendedProjects: computed(() =>
      projects().filter((p) => p.status === ProjectStatus.SUSPENDED)
    )
  })),
  withComputed((store) => ({
    projectLimit: computed(() => (tenantPlan: PlanType) => PLAN_PROJECT_LIMITS[tenantPlan]),
    isAtProjectLimit: computed(() => (tenantPlan: PlanType) => {
      const limit = PLAN_PROJECT_LIMITS[tenantPlan]
      return limit !== null && store.activeProjects().length >= limit
    })
  })),

  withMethods(
    (store, projectService = inject(ProjectService), toast = inject(ToastMessageService)) => ({
      setProjects(projects: Project[]) {
        patchState(store, { projects })
      },

      create: rxMethod<ProjectPayload>(
        pipe(
          tap(() => patchState(store, { loading: true, error: null })),
          switchMap((payload) =>
            projectService.addNewProject(payload).pipe(
              tap((project: Project) => {
                patchState(store, { loading: false, projects: [project, ...store.projects()] })
                toast.showSuccess('Success', 'Project created successfully')
              }),
              catchError((error: Error) => {
                patchState(store, {
                  loading: false,
                  error: error.error?.message ?? 'Project creation failed'
                })
                toast.showError(error.error?.error, error.error?.message)
                return EMPTY
              })
            )
          )
        )
      ),
      archive: rxMethod<string>(
        pipe(
          switchMap((id) => {
            const previous = store.projects()

            patchState(store, {
              projects: previous.map((project) =>
                project.id === id
                  ? {
                      ...project,
                      status: ProjectStatus.ARCHIVED,
                      archivedAt: new Date().toISOString()
                    }
                  : project
              )
            })

            return projectService.archiveProject(id).pipe(
              tap(() => toast.showSuccess('Success', 'Project archived successfully')),
              catchError((error: Error) => {
                patchState(store, { projects: previous }) // rollback
                toast.showError(error.error?.error, error.error?.message)
                return EMPTY
              })
            )
          })
        )
      )
    })
  )
)
