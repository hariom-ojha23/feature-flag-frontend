import { Project } from '../../../feature/project/interfaces/project.interface'

export interface ProjectsState {
  projects: Project[]
  loading: boolean
  error: string | null
}

export interface AvailableProject {
  id: string
  name: string
}
