export interface LoginPayload {
  email: string
  password: string
}

export interface RegisterPayload extends LoginPayload {
  tenantName: string
  fullName: string
}

export interface LoginResponse {
  token: string
}

export interface ResendEmailResponse {
  success: boolean
  message: string
}

export interface VerifyEmailResponse {
  success: boolean
  message: string
}
