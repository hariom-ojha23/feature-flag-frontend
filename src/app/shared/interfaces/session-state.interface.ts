import { TenantStatus } from '../enums/tenant.enum'
import { UserRole, UserStatus } from '../enums/user.enum'

export interface SessionResponse {
  user: SessionUser
  tenant: SessionTenant
  project: any
  availableProjects: any[]
}

export interface SessionState {
  user: SessionUser | null
  tenant: SessionTenant | null
  project: any
  availableProjects: any[]
  loading: boolean
  initialized: boolean
  authError: string | null
}

export interface SessionUser {
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

export interface SessionTenant {
  id: string
  logoUrl: string
  name: string
  status: TenantStatus
  createdAt: Date
  updatedAt: Date
}
