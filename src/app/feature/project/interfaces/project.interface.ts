import { ProjectStatus } from '../../../shared/enums/project.enum'
import { UserSummary } from '../../../core/stores/interfaces/session-state.interface'

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
  archivedAt?: Date | string
  suspendedAt?: Date | string
  createdBy: UserSummary
  updatedBy?: UserSummary
  createdAt?: Date
  updatedAt?: Date
}
