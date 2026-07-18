import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners
} from '@angular/core'
import { provideHttpClient, withInterceptors } from '@angular/common/http'
import { provideRouter } from '@angular/router'

import { routes } from './app.routes'
import { providePrimeNG } from 'primeng/config'
import { PrimeNgConfig } from './preset.config'
import { MessageService } from 'primeng/api'
import { AuthInterceptor } from './core/interceptors/auth.interceptor'
import { SessionStore } from './core/stores/session.store'
import { filter, firstValueFrom } from 'rxjs'
import { toObservable } from '@angular/core/rxjs-interop'

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    providePrimeNG(PrimeNgConfig),
    provideHttpClient(withInterceptors([AuthInterceptor])),
    MessageService,
    provideAppInitializer(() => {
      const session = inject(SessionStore)
      session.rehydrate()
      // wait until initialized flips true before app finishes bootstrapping
      return firstValueFrom(toObservable(session.initialized).pipe(filter((v) => v === true)))
    })
  ]
}
