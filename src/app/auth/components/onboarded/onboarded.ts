import { Component } from '@angular/core'
import { RouterModule } from '@angular/router'
import { PIcon } from '@primeicons/angular/p-icon'
import { ButtonModule } from 'primeng/button'
import { Card } from 'primeng/card'

@Component({
  selector: 'app-onboarded',
  imports: [Card, PIcon, ButtonModule, RouterModule],
  templateUrl: './onboarded.html',
  styleUrl: './onboarded.css'
})
export class Onboarded {
  steps = ['Email Verified', 'Project Created', 'Environments provisioned']
}
