import { Component, inject, input } from '@angular/core'
import { SidebarModule } from 'primeng/sidebar'
import { NavGroup, NavItem } from '../../interfaces/nav-item.interface'
import { PIcon } from '@primeicons/angular/p-icon'
import { AvatarModule } from 'primeng/avatar'
import { LabelModule } from 'primeng/label'
import { FormsModule } from '@angular/forms'
import { LogoWithName } from '../../../shared/components/logo-with-name/logo-with-name'
import { ButtonModule } from 'primeng/button'
import { isActive, Router, RouterLink, RouterLinkActive } from '@angular/router'
import { CommonModule } from '@angular/common'
import { ProjectSwitcher } from '../../../feature/project/components/project-switcher/project-switcher'

@Component({
  selector: 'app-main-sidebar',
  imports: [
    CommonModule,
    ButtonModule,
    AvatarModule,
    SidebarModule,
    LabelModule,
    FormsModule,
    PIcon,
    LogoWithName,
    RouterLink,
    RouterLinkActive,
    ProjectSwitcher
],
  templateUrl: './main-sidebar.html',
  styleUrl: './main-sidebar.css'
})
export class MainSidebar {
  private readonly router = inject(Router)

  navGroups = input.required<NavGroup[]>()
  isMobile = input.required<boolean>()

  hasActiveSub(item: NavItem): boolean {
    return (
      item.subItems?.some((sub) =>
        isActive(sub.route, this.router, {
          paths: 'exact',
          queryParams: 'ignored',
          matrixParams: 'ignored',
          fragment: 'ignored'
        })
      ) ?? false
    )
  }
}
