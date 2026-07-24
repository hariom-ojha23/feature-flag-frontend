import { PlanType } from '../enums/plan-type.enum'

export const PLAN_PROJECT_LIMITS: Record<PlanType, number | null> = {
  [PlanType.FREE]: 2,
  [PlanType.PRO]: 20,
  [PlanType.ENTERPRISE]: null
}
