import { Component, input, output } from '@angular/core'
import { ProjectStatus } from '../../../../shared/enums/project.enum'
import { Project } from '../../interfaces/project.interface'
import { RouterModule } from '@angular/router'
import { TagModule } from 'primeng/tag'
import { ButtonModule } from 'primeng/button'
import { CardModule } from 'primeng/card'
import { AvatarModule } from 'primeng/avatar'
import { DividerModule } from 'primeng/divider'
import { BadgeModule } from 'primeng/badge'
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-project-card',
  imports: [
    RouterModule,
    TagModule,
    CardModule,
    ButtonModule,
    DividerModule,
    AvatarModule,
    BadgeModule,
    DatePipe
  ],
  templateUrl: './project-card.html',
  styleUrl: './project-card.css'
})
export class ProjectCard {
  project = input.required<Project>()
  archive = output<string>()

  readonly ProjectStatus = ProjectStatus

  onArchive(event: Event) {
    event.stopPropagation()
    event.preventDefault()
    this.archive.emit(this.project().id)
  }
}
