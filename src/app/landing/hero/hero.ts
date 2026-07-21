import { Component, computed, signal } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { ButtonModule } from 'primeng/button'
import { SelectModule } from 'primeng/select'
import { TagModule } from 'primeng/tag'
import { ProgressBarModule } from 'primeng/progressbar'
import { ToggleSwitchModule } from 'primeng/toggleswitch'
import { PIcon } from '@primeicons/angular/p-icon'
import { RouterModule } from '@angular/router'

type Environment = 'Development' | 'Staging' | 'Production'

interface FeatureFlag {
  id: string
  name: string
  key: string
  enabled: boolean
  rollout: number
}

interface Evaluation {
  id: string
  user: string
  flagKey: string
  result: 'true' | 'false'
  timeAgo: string
}

@Component({
  selector: 'app-hero',
  imports: [
    RouterModule,
    FormsModule,
    ButtonModule,
    SelectModule,
    TagModule,
    ProgressBarModule,
    ToggleSwitchModule,
    PIcon
  ],
  templateUrl: './hero.html',
  styleUrl: './hero.css'
})
export class Hero {
  protected readonly environments: Environment[] = ['Development', 'Staging', 'Production']
  protected readonly selectedEnvironment = signal<Environment>('Production')

  protected readonly flags = signal<FeatureFlag[]>([
    { id: 'f1', name: 'New checkout flow', key: 'checkout-v2', enabled: true, rollout: 75 },
    { id: 'f2', name: 'AI recommendations', key: 'ai-recs', enabled: true, rollout: 40 },
    { id: 'f3', name: 'Dark mode default', key: 'dark-default', enabled: false, rollout: 0 },
    { id: 'f4', name: 'Usage-based billing', key: 'billing-v3', enabled: true, rollout: 100 }
  ])

  protected readonly evaluations: Evaluation[] = [
    { id: 'e1', user: 'user_8213', flagKey: 'checkout-v2', result: 'true', timeAgo: '2s ago' },
    { id: 'e2', user: 'user_4471', flagKey: 'ai-recs', result: 'true', timeAgo: '5s ago' },
    { id: 'e3', user: 'user_9012', flagKey: 'billing-v3', result: 'true', timeAgo: '9s ago' },
    { id: 'e4', user: 'user_2288', flagKey: 'ai-recs', result: 'false', timeAgo: '14s ago' }
  ]

  /** Derived, never duplicated: active-flag count always reflects `flags()`. */
  protected readonly activeFlagCount = computed(
    () => this.flags().filter((flag) => flag.enabled).length
  )

  protected readonly averageRollout = computed(() => {
    const enabled = this.flags().filter((flag) => flag.enabled)
    if (enabled.length === 0) return 0
    const total = enabled.reduce((sum, flag) => sum + flag.rollout, 0)
    return Math.round(total / enabled.length)
  })

  toggleFlag(id: string): void {
    this.flags.update((current) =>
      current.map((flag) => (flag.id === id ? { ...flag, enabled: !flag.enabled } : flag))
    )
  }
}
