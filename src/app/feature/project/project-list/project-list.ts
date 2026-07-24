import { Component, computed, inject, signal } from '@angular/core'
import { ProjectStore } from '../../../core/stores/project.store'
import { SessionStore } from '../../../core/stores/session.store'

import { SkeletonModule } from 'primeng/skeleton'
import { ProjectCard } from '../components/project-card/project-card'
import { FormsModule } from '@angular/forms'
import { ButtonModule } from 'primeng/button'
import { InputTextModule } from 'primeng/inputtext'
import { ProjectForm } from "../project-form/project-form";

@Component({
  selector: 'app-project-list',
  imports: [FormsModule, SkeletonModule, ProjectCard, ButtonModule, InputTextModule, ProjectForm],
  templateUrl: './project-list.html',
  styleUrl: './project-list.css'
})
export class ProjectList {
  private readonly sessionStore = inject(SessionStore)
  private readonly projectStore = inject(ProjectStore)

  readonly search = signal<string>('')
  readonly loading = this.projectStore.loading()

  readonly dialogOpen = signal(false)

  isAtLimit = computed(() => {
    const plan = this.sessionStore.tenant()?.plan
    return plan ? this.projectStore.isAtProjectLimit()(plan) : false
  })

  readonly filteredProjects = computed(() => {
    const term = this.search().trim()
    const projects = this.projectStore.activeProjects()
    if (!term) return projects
    return projects.filter(
      (p) => p.name.toLowerCase().includes(term) || p.name.toLowerCase().includes(term)
    )
  })

  onArchive(id: string) {
    this.projectStore.archive(id)
  }
}
