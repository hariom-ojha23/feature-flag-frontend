import { HttpInterceptorFn } from '@angular/common/http'
import { inject } from '@angular/core'
import { TokenService } from '../../auth/services/token.service'

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = inject(TokenService)
  const token = tokenService.getToken()

  if (!token) return next(req)

  const authRequest = req.clone({
    setHeaders: { Authorization: `Bearer ${token}` }
  })

  return next(authRequest)
}
