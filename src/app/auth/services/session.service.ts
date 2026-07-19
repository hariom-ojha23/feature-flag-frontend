import { inject, Injectable } from '@angular/core'
import { ApiService } from '../../shared/services/api.service'
import { SessionResponse } from '../../shared/interfaces/session-state.interface'

@Injectable({ providedIn: 'root' })
export class SessionService {
  private api = inject(ApiService)

  getSession(projectId: string | undefined = undefined) {
    let endPoint = `auth/session`

    if (projectId) {
      endPoint += `?projectId=${projectId}`
    }

    return this.api.get<SessionResponse>(endPoint)
  }
}
