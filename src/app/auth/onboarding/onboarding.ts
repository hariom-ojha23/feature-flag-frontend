import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { ButtonModule } from 'primeng/button'
import { InputGroupModule } from 'primeng/inputgroup'
import { InputGroupAddonModule } from 'primeng/inputgroupaddon'
import { StepperModule } from 'primeng/stepper'
import { InputTextModule } from 'primeng/inputtext'
import { FirstProject } from '../first-project/first-project'
import { VerifyEmail } from '../verify-email/verify-email'

import { PIcon } from '@primeicons/angular/p-icon'

interface OnboardingStep {
  value: number
  icon: string
  component: 'verify-email' | 'first-project' | 'complete'
}

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
  steps: OnboardingStep[] = [
    { value: 1, icon: 'envelope', component: 'verify-email' },
    { value: 2, icon: 'pencil', component: 'first-project' },
    { value: 3, icon: 'check', component: 'complete' }
  ]

  activeStep: number = 1
}
