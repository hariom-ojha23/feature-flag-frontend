import { Component, signal } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { ButtonModule } from 'primeng/button'
import { TagModule } from 'primeng/tag'
import { ToggleSwitchModule } from 'primeng/toggleswitch'
import { PIcon } from "@primeicons/angular/p-icon";

interface PricingPlan {
  name: string
  description: string
  monthlyPrice: number
  featured: boolean
  features: string[]
  cta: string
}

@Component({
  selector: 'app-pricing',
  imports: [FormsModule, ButtonModule, ToggleSwitchModule, TagModule, PIcon],
  templateUrl: './pricing.html',
  styleUrl: './pricing.css'
})
export class Pricing {
  protected readonly annualBilling = signal(false)

  protected readonly plans: PricingPlan[] = [
    {
      name: 'Starter',
      description: 'For side projects and small teams getting started with flags.',
      monthlyPrice: 0,
      featured: false,
      features: [
        'Up to 10,000 evaluations/mo',
        '3 environments',
        'Up to 3 team members',
        'Community support'
      ],
      cta: 'Start for free'
    },
    {
      name: 'Growth',
      description: 'For product teams shipping features every week.',
      monthlyPrice: 999,
      featured: true,
      features: [
        'Up to 2M evaluations/mo',
        'Unlimited environments',
        'Up to 20 team members',
        'Progressive rollouts & targeting',
        'Priority email support'
      ],
      cta: 'Start free trial'
    },
    {
      name: 'Enterprise',
      description: 'For organizations with advanced security and scale needs.',
      monthlyPrice: 2999,
      featured: false,
      features: [
        'Unlimited evaluations',
        'SSO & audit-ready logs',
        'Unlimited team members',
        'Dedicated support & SLA',
        'Custom contracts'
      ],
      cta: 'Contact sales'
    }
  ]

  displayedPrice(plan: PricingPlan): number {
    return this.annualBilling() ? Math.round(plan.monthlyPrice * 0.8) : plan.monthlyPrice
  }
}
