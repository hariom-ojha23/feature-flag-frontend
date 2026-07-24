import { Component, inject, signal, ViewChild } from '@angular/core'
import { SessionStore } from '../../../../core/stores/session.store'
import { ProjectStore } from '../../../../core/stores/project.store'

import { PopoverModule } from 'primeng/popover'
import { Popover } from 'primeng/popover'
import { getInitials } from '../../../../shared/utils/get-initials'
import { Project } from '../../interfaces/project.interface'

@Component({
  selector: 'app-project-switcher',
  imports: [PopoverModule],
  templateUrl: './project-switcher.html',
  styleUrl: './project-switcher.css'
})
export class ProjectSwitcher {
  private readonly sessionStore = inject(SessionStore)
  private readonly projectStore = inject(ProjectStore)

  @ViewChild('popover') popover!: Popover

  readonly activeProject = this.sessionStore.project
  readonly activeProjects = this.projectStore.activeProjects

  readonly search = signal('')

  readonly filteredProjects = () => {
    const term = this.search().trim()
    const projects = this.activeProjects()
    if (!term) return projects
    return projects.filter((p) => p.name.toLowerCase().includes(term))
  }

  initials(name: string) {
    return getInitials(name)
  }

  select(project: Project, event: Event) {
    this.popover.hide()
    if (project.id === this.activeProject()?.id) return
    this.sessionStore.switchProject(project.id)
  }
}
