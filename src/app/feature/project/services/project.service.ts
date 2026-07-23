import { inject, Injectable } from '@angular/core'
import { ApiService } from '../../../shared/services/api.service'
import { Project, ProjectPayload } from '../interfaces/project.interface'

@Injectable({ providedIn: 'root' })
export class ProjectService {
  private readonly apiService = inject(ApiService)

  addNewProject(payload: ProjectPayload) {
    return this.apiService.post<Project>('projects', payload)
  }

  previewProjectKey(name: string) {
    return this.apiService.get<{ key: string }>(`projects/preview-key?name=${name}`)
  }
}
