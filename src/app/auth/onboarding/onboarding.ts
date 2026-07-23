import { CommonModule } from '@angular/common'
import { Component, computed, inject } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { ButtonModule } from 'primeng/button'
import { InputGroupModule } from 'primeng/inputgroup'
import { InputGroupAddonModule } from 'primeng/inputgroupaddon'
import { StepperModule } from 'primeng/stepper'
import { InputTextModule } from 'primeng/inputtext'
import { FirstProject } from '../components/first-project/first-project'
import { VerifyEmail } from '../components/verify-email/verify-email'

import { PIcon } from '@primeicons/angular/p-icon'
import { SessionStore } from '../../core/stores/session.store'
import { OnboardingStep } from '../interfaces/onboarding.interface'
import { ONBOARDING_STEP } from '../../shared/enums/onboarding.enum'
import { Onboarded } from "../components/onboarded/onboarded";

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
    PIcon,
    Onboarded
],
  templateUrl: './onboarding.html',
  styleUrl: './onboarding.css'
})
export class Onboarding {
  private readonly session = inject(SessionStore)

  steps: OnboardingStep[] = [
    { value: 1, icon: 'envelope', component: ONBOARDING_STEP.VERIFY_EMAIL },
    { value: 2, icon: 'pencil', component: ONBOARDING_STEP.FIRST_PROJECT },
    { value: 3, icon: 'check', component: ONBOARDING_STEP.COMPLETE }
  ]

  /**
   * Email verified   -> First Project
   * Project Created  -> Complete
   * Else             -> Verify Email
   */
  activeStep = computed<number>(() => {
    return !this.session.user()?.isEmailVerified ? 1 : !this.session.project() ? 2 : 3
  })
}
