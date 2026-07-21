import { Component, computed, signal } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { SelectModule } from 'primeng/select'
import { SliderModule } from 'primeng/slider'
import { TagModule } from 'primeng/tag'
import { PIcon } from "@primeicons/angular/p-icon";

type Environment = 'Development' | 'Staging' | 'Production'
type Country = 'United States' | 'Germany' | 'India' | 'Brazil' | 'Japan'
type Role = 'Admin' | 'Beta tester' | 'Free user' | 'Pro user'

interface SimulatedUser {
  id: number
  /** Fixed 0–99 bucket assigned once at load — stable "identity" for consistent rollout hashing. */
  bucket: number
}

/**
 * Design pattern: this is a small self-contained "simulation" component —
 * all four controls (rollout, environment, country, role) are independent
 * signals, and every derived value (the sample user's evaluation, the
 * population match count) is a `computed()` over them. There is no manual
 * subscription or change-detection call anywhere; Angular's signal graph
 * handles recomputation and OnPush re-render automatically.
 *
 * Principle: deterministic evaluation. Real feature-flag rollouts use a
 * stable hash of (flag key + user id) mapped to a 0–99 bucket, so the same
 * user always gets the same result at a given rollout % — flipping the
 * percentage back and forth doesn't "re-roll" anyone already in. This demo
 * mirrors that with a simple string hash instead of a cryptographic one.
 *
 * Tradeoff: the hash here is a fast, non-cryptographic string hash (good
 * enough for a UI demo's uniform-ish distribution) rather than something
 * like MurmurHash used in real SDKs — swapping it out later is a one-line
 * change since it's isolated in `hashToBucket()`.
 */
@Component({
  selector: 'app-interactive-demo',
  imports: [FormsModule, SelectModule, SliderModule, TagModule, PIcon],
  templateUrl: './interactive-demo.html',
  styleUrl: './interactive-demo.css'
})
export class InteractiveDemo {
  protected readonly environments: Environment[] = ['Development', 'Staging', 'Production']
  protected readonly countries: Country[] = ['United States', 'Germany', 'India', 'Brazil', 'Japan']
  protected readonly roles: Role[] = ['Admin', 'Beta tester', 'Free user', 'Pro user']

  protected readonly rollout = signal(35)
  protected readonly environment = signal<Environment>('Production')
  protected readonly country = signal<Country>('India')
  protected readonly role = signal<Role>('Pro user')

  /** Stable population of 30 simulated users, each with a fixed random bucket. */
  protected readonly sampleUsers: SimulatedUser[] = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    bucket: Math.floor(this.hashToBucket(`sample-user-${i}`))
  }))

  protected readonly matchedCount = computed(
    () => this.sampleUsers.filter((user) => user.bucket < this.rollout()).length
  )

  /** The one "you" user, re-evaluated live against every control. */
  protected readonly currentUserBucket = computed(() =>
    this.hashToBucket(`${this.environment()}-${this.country()}-${this.role()}`)
  )

  protected readonly currentUserResult = computed(() => this.currentUserBucket() < this.rollout())

  private hashToBucket(seed: string): number {
    let hash = 0
    for (let i = 0; i < seed.length; i++) {
      hash = (hash << 5) - hash + seed.charCodeAt(i)
      hash |= 0
    }
    return Math.abs(hash) % 100
  }
}
