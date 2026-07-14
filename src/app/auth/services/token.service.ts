import { Injectable } from '@angular/core'

@Injectable({ providedIn: 'root' })
export class TokenService {
  constructor() {}

  private TOKEN_KEY = 'access_token'

  addToken(token: string) {
    localStorage.setItem(this.TOKEN_KEY, token)
  }

  removeToken() {
    return localStorage.removeItem(this.TOKEN_KEY)
  }

  getToken() {
    return localStorage.getItem(this.TOKEN_KEY)
  }
}
