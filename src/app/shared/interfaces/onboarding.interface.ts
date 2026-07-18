import { ONBOARDING_STEP } from '../enums/onboarding.enum'

export type OnboardingComponent =
  ONBOARDING_STEP.VERIFY_EMAIL | ONBOARDING_STEP.FIRST_PROJECT | ONBOARDING_STEP.COMPLETE

export interface OnboardingStep {
  value: number
  icon: string
  component: OnboardingComponent
}
