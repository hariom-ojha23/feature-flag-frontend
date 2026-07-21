import { Component, signal } from '@angular/core'
import { PIcon } from '@primeicons/angular/p-icon'
import { ButtonModule } from 'primeng/button'
import { DrawerModule } from 'primeng/drawer'
import { SidebarModule } from 'primeng/sidebar'
import { RouterModule } from '@angular/router'

interface NavLink {
  label: string
  fragment: string
}

@Component({
  selector: 'app-navbar',
  imports: [RouterModule, ButtonModule, DrawerModule, SidebarModule, PIcon],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
  protected readonly mobileMenuOpen = signal(false)

  protected readonly links: NavLink[] = [
    { label: 'Features', fragment: 'features' },
    { label: 'Demo', fragment: 'interactive-demo' },
    { label: 'Pricing', fragment: 'pricing' },
    { label: 'FAQ', fragment: 'faq' }
  ]

  openMobileMenu(): void {
    this.mobileMenuOpen.set(true)
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen.set(false)
  }
}
