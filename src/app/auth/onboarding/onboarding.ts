import { CommonModule } from '@angular/common'
import { Component, computed, inject } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { ButtonModule } from 'primeng/button'
import { InputGroupModule } from 'primeng/inputgroup'
import { InputGroupAddonModule } from 'primeng/inputgroupaddon'
import { StepperModule } from 'primeng/stepper'
import { InputTextModule } from 'primeng/inputtext'
import { FirstProject } from '../first-project/first-project'
import { VerifyEmail } from '../verify-email/verify-email'

import { PIcon } from '@primeicons/angular/p-icon'
import { SessionStore } from '../../core/stores/session.store'
import { OnboardingStep } from '../../shared/interfaces/onboarding.interface'
import { ONBOARDING_STEP } from '../../shared/enums/onboarding.enum'

@Component({
  selector: 'app-onboarding',
  imports: [
    StepperModule,
    FormsModule,
    CommonModule,
    ButtonModule,
    InputGroupModule,
    InputTextModule,
    InputGroupAddonModule,
    FirstProject,
    VerifyEmail,
    PIcon
  ],
  templateUrl: './onboarding.html',
  styleUrl: './onboarding.css'
})
export class Onboarding {
  private readonly sessionStore = inject(SessionStore)

  steps: OnboardingStep[] = [
    { value: 1, icon: 'envelope', component: ONBOARDING_STEP.VERIFY_EMAIL },
    { value: 2, icon: 'pencil', component: ONBOARDING_STEP.FIRST_PROJECT },
    { value: 3, icon: 'check', component: ONBOARDING_STEP.COMPLETE }
  ]

  /**
   * Email verified -> First Project
   *                -> Verify Email
   */
  activeStep = computed<number>(() => this.sessionStore.user()?.isEmailVerified ? 2 : 1)
}
