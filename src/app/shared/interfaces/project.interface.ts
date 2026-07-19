import { User } from '@primeicons/angular/user'
import { ProjectStatus } from '../enums/project.enum'

export interface ProjectPayload {
  name: string
  key: string
  description: string | null
  status: ProjectStatus
}

export interface Project {
  id: string
  name: string
  key: string
  description: string | null
  status: ProjectStatus
  archivedAt?: Date
  createdBy: Partial<User>
  updatedBy: Partial<User>
  createdAt: Date
  updatedAt: Date
}
