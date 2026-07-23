import { Injectable } from '@angular/core'
import {
  LoginPayload,
  LoginResponse,
  RegisterPayload
} from '../interfaces/auth.interface'
import { ApiService } from '../../shared/services/api.service'
import { tap } from 'rxjs'
import { TokenService } from './token.service'

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(
    private apiService: ApiService,
    private tokenService: TokenService
  ) {}

  login(payload: LoginPayload) {
    return this.apiService.post<LoginResponse>('auth/login', payload).pipe(
      tap(({ token }) => {
        return this.tokenService.addToken(token)
      })
    )
  }

  register(payload: RegisterPayload) {
    return this.apiService.post<LoginResponse>('auth/register', payload).pipe(
      tap(({ token }) => {
        return this.tokenService.addToken(token)
      })
    )
  }

  logout() {
    return this.apiService.post('auth/logout', {}).pipe(
      tap(() => {
        return this.tokenService.removeToken()
      })
    )
  }
}
