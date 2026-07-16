import { Component, inject, signal } from '@angular/core'
import { InputGroupModule } from 'primeng/inputgroup'
import { InputGroupAddonModule } from 'primeng/inputgroupaddon'
import { InputTextModule } from 'primeng/inputtext'
import { CardModule } from 'primeng/card'
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms'
import { ButtonModule } from 'primeng/button'
import { Envelope } from '@primeicons/angular/envelope'
import { Lock } from '@primeicons/angular/lock'
import { RouterModule } from '@angular/router'
import { loginValidationRules } from '../../shared/constants/validation-rules/auth'
import { AuthService } from '../services/auth.service'
import { ToastMessageService } from '../../shared/services/toast.service'
import { LoginPayload } from '../../shared/interfaces/auth.interface'
import { Error } from '../../shared/interfaces/error.interface'

@Component({
  selector: 'app-login',
  imports: [
    InputGroupModule,
    InputGroupAddonModule,
    InputTextModule,
    ButtonModule,
    CardModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    Envelope,
    Lock
  ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  private readonly authService = inject(AuthService)
  private readonly toast = inject(ToastMessageService)

  invalidFields = signal({ email: false, password: false })

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  })

  control(controlName: string) {
    return this.form.get(controlName) as FormControl
  }

  private updateInvalidFields() {
    this.invalidFields.set({
      email: this.control('email').invalid,
      password: this.control('password').invalid
    })
  }

  validateForm() {
    this.form.markAllAsTouched()
    this.updateInvalidFields()

    const title = 'Validation Error'

    for (const rule of loginValidationRules) {
      if (this.control(rule.control).hasError(rule.error)) {
        this.toast.showWarn(title, rule.message)
        return false
      }
    }

    return true
  }

  login() {
    if (!this.validateForm()) {
      return
    }

    const payload = this.form.value
    this.authService.login(payload as LoginPayload).subscribe({
      next: () => {
        this.toast.showSuccess('Success', 'Login successfully')
      },
      error: ({ error }: Error) => {
        this.toast.showError(error.error, error.message)
      }
    })
  }

  forgotPassword() {}
}
