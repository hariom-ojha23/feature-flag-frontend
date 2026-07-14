export interface LoginPayload {
  email: string
  password: string
}

export interface RegisterPayload extends LoginPayload {
  tenantName: string
  fullName: string
}
