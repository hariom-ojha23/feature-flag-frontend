import { Component } from '@angular/core'
import { PIcon } from '@primeicons/angular/p-icon'
import { AccordionModule } from 'primeng/accordion'

interface FaqItem {
  value: string
  question: string
  answer: string
}

@Component({
  selector: 'app-faq',
  imports: [AccordionModule, PIcon],
  templateUrl: './faq.html',
  styleUrl: './faq.css'
})
export class Faq {
  protected readonly faqs: FaqItem[] = [
    {
      value: '0',
      question: 'How is Featurix different from just using environment variables?',
      answer:
        'Environment variables require a redeploy to change and apply to everyone at once. Featurix flags update instantly, can target specific users or cohorts, and support gradual rollouts — so you can release to 5% of users, watch metrics, and expand without touching your deploy pipeline.'
    },
    {
      value: '1',
      question: 'Will Featurix slow down my application?',
      answer:
        'No. Flag evaluation happens against a local, periodically-synced cache in every SDK, so evaluating a flag is a local lookup, not a network call. Typical evaluation time is under a millisecond.'
    },
    {
      value: '2',
      question: 'Can I self-host Featurix?',
      answer:
        'Enterprise plans support a self-hosted relay proxy that keeps flag evaluation inside your own network, with only rule updates syncing to Featurix. Fully self-hosted deployments are available for regulated industries — reach out to sales for details.'
    },
    {
      value: '3',
      question: 'What happens if Featurix is unreachable?',
      answer:
        'Every SDK falls back to the last successfully synced ruleset stored in local cache, so evaluations keep working using the most recent known state. You can also configure explicit default values per flag as a final fallback.'
    },
    {
      value: '4',
      question: 'Do you offer a free plan?',
      answer:
        'Yes — the Starter plan is free forever for up to 10,000 evaluations a month, with no credit card required. It is a good fit for side projects and early-stage products.'
    }
  ]
}
