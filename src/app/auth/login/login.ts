import { Component } from '@angular/core'
import { AuthWrapper } from '../../shared/components/auth-wrapper/auth-wrapper'
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

@Component({
  selector: 'app-login',
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
    Envelope,
    Lock
  ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  })

  login() {
    if (this.form.valid) {
      const { email, password } = this.form.value
      console.log('Logging in with:', email, password)
    }
  }

  forgotPassword() {}
}
