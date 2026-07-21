import { Component } from '@angular/core'
import { CardModule } from 'primeng/card'
import { PIcon } from "@primeicons/angular/p-icon";

interface Feature {
  icon: string
  title: string
  description: string
}

@Component({
  selector: 'app-features',
  imports: [CardModule, PIcon],
  templateUrl: './features.html',
  styleUrl: './features.css'
})
export class Features {
  protected readonly features: Feature[] = [
    {
      icon: 'sliders-h',
      title: 'Granular targeting',
      description:
        'Target by user attribute, cohort, plan, or custom rule. Ship the right experience to the right people, every time.'
    },
    {
      icon: 'percentage',
      title: 'Progressive rollouts',
      description:
        'Roll out from 1% to 100% on your schedule. Pause or revert instantly if something looks off — no redeploy required.'
    },
    {
      icon: 'sitemap',
      title: 'Environment-aware',
      description:
        'Keep development, staging, and production flags isolated with independent states, values, and permissions.'
    },
    {
      icon: 'bolt',
      title: 'Sub-50ms evaluation',
      description:
        'Flags are evaluated at the edge, close to your users, so targeting logic never becomes a latency tax.'
    },
    {
      icon: 'history',
      title: 'Full audit trail',
      description:
        'Every toggle, rollout change, and rule edit is logged with who, what, and when — built for compliance from day one.'
    },
    {
      icon: 'code',
      title: 'SDKs for every stack',
      description:
        'Official SDKs for JavaScript, React, Node, Python, Go, and more, all sharing the same simple evaluation API.'
    }
  ]
}
