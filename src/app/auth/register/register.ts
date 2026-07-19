import { Component, inject, signal } from '@angular/core'
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms'
import { RouterModule } from '@angular/router'

import { InputGroupModule } from 'primeng/inputgroup'
import { InputGroupAddonModule } from 'primeng/inputgroupaddon'
import { InputTextModule } from 'primeng/inputtext'
import { ButtonModule } from 'primeng/button'

import { User } from '@primeicons/angular/user'
import { Lock } from '@primeicons/angular/lock'
import { Envelope } from '@primeicons/angular/envelope'
import { BuildingColumns } from '@primeicons/angular/building-columns'
import { CardModule } from 'primeng/card'
import { ToastMessageService } from '../../shared/services/toast.service'
import { registerValidationRules } from '../../shared/constants/validation-rules/auth'
import { RegisterPayload } from '../../shared/interfaces/auth.interface'
import { Error } from '../../shared/interfaces/error.interface'
import { SessionStore } from '../../core/stores/session.store'

@Component({
  selector: 'app-register',
  imports: [
    InputGroupModule,
    InputGroupAddonModule,
    InputTextModule,
    ButtonModule,
    CardModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    User,
    Lock,
    Envelope,
    BuildingColumns
  ],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  private readonly session = inject(SessionStore)
  private readonly toast = inject(ToastMessageService)

  invalidFields = signal({
    tenantName: false,
    fullName: false,
    email: false,
    password: false,
    confirmPassword: false
  })

  form = new FormGroup({
    tenantName: new FormControl('', [Validators.required]),
    fullName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6)])
  })

  control(controlName: string) {
    return this.form.get(controlName) as FormControl
  }

  private updateInvalidFields() {
    this.invalidFields.set({
      tenantName: this.control('tenantName').invalid,
      fullName: this.control('fullName').invalid,
      email: this.control('email').invalid,
      password: this.control('password').invalid,
      confirmPassword: this.control('confirmPassword').invalid
    })
  }

  private validateForm(): boolean {
    this.form.markAllAsTouched()
    this.updateInvalidFields()

    const title = 'Validation Error'

    for (const rule of registerValidationRules) {
      if (this.control(rule.control).hasError(rule.error)) {
        this.toast.showWarn(title, rule.message)
        return false
      }
    }

    if (this.form.hasError('passwordMismatch')) {
      this.toast.showWarn(title, 'Password and confirm password do not match.')
      return false
    }

    return true
  }

  register() {
    if (!this.validateForm()) return

    const { confirmPassword, ...payload } = this.form.value
    this.session.register(payload as RegisterPayload)
  }
}
