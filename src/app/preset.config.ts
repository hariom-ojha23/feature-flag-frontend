import { definePreset, palette } from '@primeuix/themes'
import Aura from '@primeuix/themes/aura'
import { PrimeNGConfigType } from 'primeng/config'
import { environment } from '../environments/environment'

const ThemePreset = definePreset(Aura, {
  semantic: {
    primary: palette('{emerald}'),
    surface: palette('{slate}')
  }
})

export const PrimeNgConfig: PrimeNGConfigType = {
  license: environment.primeLicense,
  theme: {
    preset: ThemePreset,
    options: {
      prefix: 'p',
      darkModeSelector: 'system',
      cssLayer: false,
      cssVariables: true
    }
  },
  zIndex: {
    modal: 1100, // dialog, drawer
    overlay: 1000, // select, popover
    menu: 1000, // overlay menus
    tooltip: 1100 // tooltip
  }
}
