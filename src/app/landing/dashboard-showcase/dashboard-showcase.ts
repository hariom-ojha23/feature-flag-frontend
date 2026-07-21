import { Component, signal } from '@angular/core'
import { ProgressBarModule } from 'primeng/progressbar'
import { TabsModule } from 'primeng/tabs'
import { TagModule } from 'primeng/tag'
import { TableModule } from 'primeng/table'
import { AvatarModule } from 'primeng/avatar'
import { TimelineModule } from 'primeng/timeline'
import { PIcon } from '@primeicons/angular/p-icon'

type FlagStatus = 'Active' | 'Paused'

interface ShowcaseFlag {
  name: string
  key: string
  status: FlagStatus
  environment: string
  rollout: number
}

interface TeamMember {
  name: string
  role: string
  initials: string
}

interface AuditEvent {
  icon: string
  description: string
  actor: string
  time: string
}

/**
 * Design pattern: one component, four static "screens" switched by a
 * single `activeTab` signal bound to PrimeNG's `p-tabs [(value)]`. This
 * mirrors how the real product would be structured (one route, several
 * views) without the overhead of Angular Router for what is, on a landing
 * page, purely a visual demonstration.
 *
 * Tradeoff: because everything is one component, the mock data (flags,
 * team, audit events) lives here rather than a shared service — correct
 * for a marketing showcase where none of it is real or reused elsewhere,
 * but it's the first thing to extract into a data layer if this ever
 * became the real app shell.
 */
@Component({
  selector: 'app-dashboard-showcase',
  imports: [
    TabsModule,
    TagModule,
    ProgressBarModule,
    TableModule,
    AvatarModule,
    TimelineModule,
    PIcon
  ],
  templateUrl: './dashboard-showcase.html',
  styleUrl: './dashboard-showcase.css'
})
export class DashboardShowcase {
  protected readonly activeTab = signal('overview')

  protected readonly flags: ShowcaseFlag[] = [
    {
      name: 'New checkout flow',
      key: 'checkout-v2',
      status: 'Active',
      environment: 'Production',
      rollout: 75
    },
    {
      name: 'AI recommendations',
      key: 'ai-recs',
      status: 'Active',
      environment: 'Production',
      rollout: 40
    },
    {
      name: 'Dark mode default',
      key: 'dark-default',
      status: 'Paused',
      environment: 'Staging',
      rollout: 0
    },
    {
      name: 'Usage-based billing',
      key: 'billing-v3',
      status: 'Active',
      environment: 'Production',
      rollout: 100
    },
    {
      name: 'New onboarding',
      key: 'onboarding-v2',
      status: 'Active',
      environment: 'Development',
      rollout: 20
    },
    {
      name: 'Referral program',
      key: 'referrals',
      status: 'Paused',
      environment: 'Staging',
      rollout: 10
    }
  ]

  protected readonly team: TeamMember[] = [
    { name: 'Priya Sharma', role: 'Engineering Lead', initials: 'PS' },
    { name: 'Marcus Webb', role: 'Product Manager', initials: 'MW' },
    { name: 'Elena Novak', role: 'Frontend Engineer', initials: 'EN' },
    { name: 'Jordan Lee', role: 'SRE', initials: 'JL' },
    { name: 'Amara Chen', role: 'QA Engineer', initials: 'AC' }
  ]

  protected readonly auditEvents: AuditEvent[] = [
    {
      icon: 'percentage',
      description: 'Rollout increased to 75% on checkout-v2',
      actor: 'Priya Sharma',
      time: '3m ago'
    },
    {
      icon: 'check-circle',
      description: 'billing-v3 fully released to Production',
      actor: 'Marcus Webb',
      time: '1h ago'
    },
    {
      icon: 'pause',
      description: 'dark-default paused after error spike',
      actor: 'Jordan Lee',
      time: '4h ago'
    },
    {
      icon: 'plus-circle',
      description: 'Created flag referrals in Staging',
      actor: 'Elena Novak',
      time: 'Yesterday'
    }
  ]

  protected readonly activeFlagCount = this.flags.filter((flag) => flag.status === 'Active').length

  protected statusSeverity(status: FlagStatus): 'success' | 'secondary' {
    return status === 'Active' ? 'success' : 'secondary'
  }
}
