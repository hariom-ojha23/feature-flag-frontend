import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners
} from '@angular/core'
import { provideHttpClient, withInterceptors } from '@angular/common/http'
import { provideRouter, withHashLocation } from '@angular/router'

import { routes } from './app.routes'
import { providePrimeNG } from 'primeng/config'
import { PrimeNgConfig } from './preset.config'
import { MessageService } from 'primeng/api'
import { AuthInterceptor } from './core/interceptors/auth.interceptor'
import { SessionStore } from './core/stores/session.store'

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withHashLocation()),
    providePrimeNG(PrimeNgConfig),
    provideHttpClient(withInterceptors([AuthInterceptor])),
    MessageService,
    provideAppInitializer(() => {
      const session = inject(SessionStore)
      session.rehydrate()
    })
  ]
}
