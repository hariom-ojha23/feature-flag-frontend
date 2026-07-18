import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core'
import { provideHttpClient, withInterceptors } from '@angular/common/http'
import { provideRouter } from '@angular/router'

import { routes } from './app.routes'
import { providePrimeNG } from 'primeng/config'
import { PrimeNgConfig } from './preset.config'
import { MessageService } from 'primeng/api'
import { AuthInterceptor } from './core/interceptors/auth.interceptor'

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    providePrimeNG(PrimeNgConfig),
    provideHttpClient(withInterceptors([AuthInterceptor])),
    MessageService
  ]
}
