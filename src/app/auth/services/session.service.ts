import { inject, Injectable } from '@angular/core'
import { ApiService } from '../../shared/services/api.service'
import { SessionResponse } from '../../shared/interfaces/session-state.interface'

@Injectable({ providedIn: 'root' })
export class SessionService {
  private api = inject(ApiService)

  getSession() {
    return this.api.get<SessionResponse>('auth/session')
  }
}
