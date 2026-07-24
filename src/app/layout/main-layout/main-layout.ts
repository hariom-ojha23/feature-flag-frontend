import { Component, signal } from '@angular/core'
import { SidebarModule } from 'primeng/sidebar'
import { NAV_GROUP } from '../navigation/nav-group'
import { MainSidebar } from '../components/main-sidebar/main-sidebar'
import { PIcon } from '@primeicons/angular/p-icon'
import { RouterModule } from '@angular/router'

@Component({
  selector: 'app-main-layout',
  imports: [RouterModule, SidebarModule, MainSidebar, PIcon],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css'
})
export class MainLayout {
  navGroups = signal(NAV_GROUP)
  isMobile = signal(false)
  selectedMenu = signal<string>('Dashboard')

  constructor() {
    if (typeof window === 'undefined') return
    const mql = window.matchMedia('(max-width: 1023px)')
    this.isMobile.set(mql.matches)
    mql.addEventListener('change', (e) => this.isMobile.set(e.matches))
  }
}
