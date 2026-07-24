export interface NavSubItem {
  label: string
  route: string
  badge?: string
}

export interface NavItem {
  icon: string
  label: string
  badge?: string
  subItems?: NavSubItem[]
  route: string
}

export interface NavGroup {
  label: string
  items: NavItem[]
}
