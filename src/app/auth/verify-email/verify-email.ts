import { Component } from '@angular/core'
import { InputGroupAddonModule } from 'primeng/inputgroupaddon'
import { InputGroupModule } from 'primeng/inputgroup'
import { Card } from 'primeng/card'
import { InputTextModule } from 'primeng/inputtext'
import { PIcon } from '@primeicons/angular/p-icon'
import { ButtonModule } from 'primeng/button'
import { InputOtpModule } from 'primeng/inputotp'

@Component({
  selector: 'app-verify-email',
  imports: [
    Card,
    ButtonModule,
    InputGroupModule,
    InputTextModule,
    InputGroupAddonModule,
    InputOtpModule,
    PIcon
  ],
  templateUrl: './verify-email.html',
  styleUrl: './verify-email.css'
})
export class VerifyEmail {}
