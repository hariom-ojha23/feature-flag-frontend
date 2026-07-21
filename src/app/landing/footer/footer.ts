import { Component, signal } from '@angular/core'
import { FormsModule } from '@angular/forms';
import { ButtonModule } from "primeng/button";
import { PIcon } from "@primeicons/angular/p-icon";
import { InputTextModule } from 'primeng/inputtext';
import { LOGO_URLS } from '../../shared/enums/logo-urls.enum';

interface FooterLinkGroup {
  title: string
  links: { label: string; href: string }[]
}

interface SocialLink {
  icon: string
  label: string
  href: string
}

@Component({
  selector: 'app-footer',
  imports: [FormsModule, ButtonModule, PIcon, InputTextModule],
  templateUrl: './footer.html',
  styleUrl: './footer.css'
})
export class Footer {
  protected readonly logoUrl = LOGO_URLS.LOGO

  protected readonly currentYear = new Date().getFullYear()

  protected readonly email = signal('')
  protected readonly subscribed = signal(false)

  protected readonly linkGroups: FooterLinkGroup[] = [
    {
      title: 'Product',
      links: [
        { label: 'Features', href: '#features' },
        { label: 'Interactive demo', href: '#interactive-demo' },
        { label: 'Pricing', href: '#pricing' }
      ]
    },
    {
      title: 'Resources',
      links: [
        { label: 'Documentation', href: '#' },
        { label: 'SDK reference', href: '#' },
        { label: 'API status', href: '#' },
        { label: 'Changelog', href: '#' }
      ]
    },
    {
      title: 'Company',
      links: [
        { label: 'About', href: '#' },
        { label: 'Blog', href: '#' },
        { label: 'Careers', href: '#' },
        { label: 'Contact', href: '#' }
      ]
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacy policy', href: '#' },
        { label: 'Terms of service', href: '#' },
        { label: 'Security', href: '#' }
      ]
    }
  ]

  protected readonly socialLinks: SocialLink[] = [
    { icon: 'github', label: 'GitHub', href: '#' },
    { icon: 'twitter', label: 'Twitter', href: '#' },
    { icon: 'linkedin', label: 'LinkedIn', href: '#' }
  ]

  subscribe(): void {
    if (!this.email().trim()) {
      return
    }
    this.subscribed.set(true)
  }
}
