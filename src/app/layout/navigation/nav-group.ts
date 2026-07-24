import { NavGroup } from '../interfaces/nav-item.interface'

export const NAV_GROUP: NavGroup[] = [
  { label: 'Overview', items: [{ label: 'Dashboard', icon: 'home', route: '/dashboard' }] },
  {
    label: 'Management',
    items: [
      { label: 'Projects', icon: 'folder', route: '/projects' },
      { label: 'Feature Flags', icon: 'flag', route: '/flags' },
      { label: 'Environments', icon: 'server', route: '/environments' },
      { label: 'Segments', icon: 'users', route: '/segments' }
    ]
  },
  {
    label: 'Administration',
    items: [
      { label: 'API Keys', icon: 'key', route: '/api-keys' },
      { label: 'Members', icon: 'user-plus', route: '/members' },
      { label: 'Audit Logs', icon: 'history', route: '/audit-log' },
      { label: 'Settings', icon: 'cog', route: '/settings' }
    ]
  }
]
