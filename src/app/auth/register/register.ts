import { Component } from '@angular/core'
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms'
import { RouterModule } from '@angular/router'

import { AuthWrapper } from '../../shared/components/auth-wrapper/auth-wrapper'
import { InputGroupModule } from 'primeng/inputgroup'
import { InputGroupAddonModule } from 'primeng/inputgroupaddon'
import { InputTextModule } from 'primeng/inputtext'
import { ButtonModule } from 'primeng/button'

import { User } from '@primeicons/angular/user'
import { Lock } from '@primeicons/angular/lock'
import { Envelope } from '@primeicons/angular/envelope'
import { CardModule } from 'primeng/card'

@Component({
  selector: 'app-register',
  imports: [
    AuthWrapper,
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
    Envelope
  ],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  form = new FormGroup({
    fullName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6)])
  })

  checkFormValidity() {
    const formValue = this.form.value

    if (formValue.password !== formValue.confirmPassword) {
      this.form.get('confirmPassword')?.setErrors({ mismatch: true })
    } else {
      this.form.get('confirmPassword')?.setErrors(null)
    }

    return this.form.valid
  }

  register() {
    const isValid = this.checkFormValidity()

    if (isValid) {
      const { fullName, email, password } = this.form.value
      console.log('Registering with:', fullName, email, password)
    }
  }
}
