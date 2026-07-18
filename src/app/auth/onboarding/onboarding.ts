import { CommonModule } from '@angular/common'
import { Component, computed, inject, linkedSignal, signal } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { ButtonModule } from 'primeng/button'
import { InputGroupModule } from 'primeng/inputgroup'
import { InputGroupAddonModule } from 'primeng/inputgroupaddon'
import { StepperModule } from 'primeng/stepper'
import { InputTextModule } from 'primeng/inputtext'
import { FirstProject } from '../first-project/first-project'
import { VerifyEmail } from '../verify-email/verify-email'

import { PIcon } from '@primeicons/angular/p-icon'
import { ActivatedRoute, Params } from '@angular/router'

type OnboardingComponent = 'verify-email' | 'first-project'

interface OnboardingStep {
  value: number
  icon: string
  component: OnboardingComponent | 'complete'
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
  private readonly activatedRoute = inject(ActivatedRoute)

  query = signal<OnboardingComponent>(
    this.activatedRoute.snapshot.queryParams['active'] ?? 'verify-email'
  )

  steps: OnboardingStep[] = [
    { value: 1, icon: 'envelope', component: 'verify-email' },
    { value: 2, icon: 'pencil', component: 'first-project' },
    { value: 3, icon: 'check', component: 'complete' }
  ]

  activeStep = linkedSignal<number>(() => {
    return this.steps.find((step) => step.component === this.query())?.value ?? 1
  })
}
