import { inject, Injectable } from '@angular/core'
import { ApiService } from '../../shared/services/api.service'
import { ResendEmailResponse, VerifyEmailResponse } from '../../shared/interfaces/auth.interface'
import { ProjectPayload } from '../../shared/interfaces/project.interface'
import { ProjectService } from '../../feature/project/services/project.service'

@Injectable({ providedIn: 'root' })
export class OnboardingService {
  private readonly apiService = inject(ApiService)
  private readonly projectService = inject(ProjectService)

  resendEmailVerifyCode() {
    return this.apiService.post<ResendEmailResponse>('auth/verify-email/resend', {})
  }

  verifyEmail(otp: string) {
    return this.apiService.post<VerifyEmailResponse>('auth/verify-email', { otp })
  }

  addFirstProject(payload: ProjectPayload) {
    return this.projectService.addNewProject(payload)
  }
}
