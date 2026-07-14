import { Injectable } from '@angular/core'
import { LoginPayload, RegisterPayload } from '../../shared/interfaces/auth.interface'
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
    return this.apiService.post<string>('auth/login', payload).pipe(
      tap((token: string) => {
        return this.tokenService.addToken(token)
      })
    )
  }

  register(payload: RegisterPayload) {
    return this.apiService.post('auth/register', payload)
  }

  logout() {
    return this.apiService.post('auth/logout', {}).pipe(
      tap(() => {
        return this.tokenService.removeToken()
      })
    )
  }
}
