import { TenantStatus } from '../../../shared/enums/tenant.enum'
import { UserRole, UserStatus } from '../../../shared/enums/user.enum'
import { Project } from '../../../feature/project/interfaces/project.interface'
import { PlanType } from '../../../shared/enums/plan-type.enum'

export interface SessionResponse {
  user: User
  tenant: Tenant
  project: any
  availableProjects: any[]
}

export interface SessionState {
  user: User | null
  tenant: Tenant | null
  project: Project | null
  loading: boolean
  initialized: boolean
  authError: string | null
}

export interface User {
  id: string
  email: string
  fullName: string
  avatarUrl: string
  invitedAt: Date
  invitedBy: string
  isEmailVerified: boolean
  lastLoginAt: Date
  refreshToken: string
  role: UserRole
  status: UserStatus
  createdAt: Date
  updatedAt: Date
}

export interface Tenant {
  id: string
  logoUrl: string
  name: string
  status: TenantStatus
  plan: PlanType
  createdAt: Date
  updatedAt: Date
}

export interface UserSummary {
  id: string
  fullName: string
}
