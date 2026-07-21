import { Component } from '@angular/core'
import { Navbar } from './navbar/navbar'
import { Hero } from './hero/hero'
import { Features } from './features/features'
import { InteractiveDemo } from './interactive-demo/interactive-demo'
import { DashboardShowcase } from './dashboard-showcase/dashboard-showcase'
import { SdkSection } from './sdk-section/sdk-section'
import { Pricing } from './pricing/pricing'
import { Faq } from './faq/faq'
import { Cta } from './cta/cta'
import { Footer } from './footer/footer'

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    Navbar,
    Hero,
    Features,
    InteractiveDemo,
    DashboardShowcase,
    SdkSection,
    Pricing,
    Faq,
    Cta,
    Footer
  ],
  templateUrl: './landing.html',
  styleUrl: './landing.css'
})
export class Landing {}
