import { Component, inject, signal } from '@angular/core'
import { InputGroupAddonModule } from 'primeng/inputgroupaddon'
import { InputGroupModule } from 'primeng/inputgroup'
import { Card } from 'primeng/card'
import { InputTextModule } from 'primeng/inputtext'
import { PIcon } from '@primeicons/angular/p-icon'
import { ButtonModule } from 'primeng/button'
import { InputOtpModule } from 'primeng/inputotp'
import { FormsModule } from '@angular/forms'
import { SessionStore } from '../../core/stores/session.store'

@Component({
  selector: 'app-verify-email',
  imports: [
    Card,
    ButtonModule,
    InputGroupModule,
    InputTextModule,
    InputGroupAddonModule,
    InputOtpModule,
    FormsModule,
    PIcon
  ],
  templateUrl: './verify-email.html',
  styleUrl: './verify-email.css'
})
export class VerifyEmail {
  protected readonly session = inject(SessionStore)

  timer = signal(60)

  otp: string = ''

  constructor() {
    this.startTimer()
  }

  startTimer() {
    this.timer.set(60)

    const id = setInterval(() => {
      if (this.timer() === 0) {
        clearInterval(id)
        return
      }

      this.timer.update((v) => v - 1)
    }, 1000)
  }

  resendCode() {
    this.startTimer()
    this.session.resendEmailVerifyCode()
  }

  verifyEmail() {
    this.session.verifyEmail(this.otp)
  }
}
