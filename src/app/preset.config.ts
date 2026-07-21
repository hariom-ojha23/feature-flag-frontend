import { definePreset, palette } from '@primeuix/themes'
import Aura from '@primeuix/themes/aura'
import { PrimeNGConfigType } from 'primeng/config'
import { environment } from '../environments/environment'

const ThemePreset = definePreset(Aura, {
  semantic: {
    primary: palette('{emerald}'),
    surface: palette('{zinc}'),
    colorScheme: {
      light: {
        surface: {
          0: '#ffffff',
          50: '{zinc.50}',
          100: '{zinc.100}',
          200: '{zinc.200}',
          300: '{zinc.300}',
          400: '{zinc.400}',
          500: '{zinc.500}',
          600: '{zinc.600}',
          700: '{zinc.700}',
          800: '{zinc.800}',
          900: '{zinc.900}',
          950: '{zinc.950}'
        },
        primary: {
          color: '{emerald.600}',
          contrastColor: '#ffffff',
          hoverColor: '{emerald.700}',
          activeColor: '{emerald.800}'
        }
      },
      dark: {
        surface: {
          0: '#ffffff',
          50: '{zinc.50}',
          100: '{zinc.100}',
          200: '{zinc.200}',
          300: '{zinc.300}',
          400: '{zinc.400}',
          500: '{zinc.500}',
          600: '{zinc.600}',
          700: '{zinc.700}',
          800: '{zinc.800}',
          900: '{zinc.900}',
          950: '{zinc.950}'
        },
        primary: {
          color: '{emerald.400}',
          contrastColor: '{zinc.950}',
          hoverColor: '{emerald.300}',
          activeColor: '{emerald.200}'
        }
      }
    }
  }
})

export const PrimeNgConfig: PrimeNGConfigType = {
  license: environment.primeLicense,
  theme: {
    preset: ThemePreset,
    options: {
      prefix: 'p',
      darkModeSelector: '.dark',
      cssLayer: {
        name: 'primeng',
        order: 'theme, base, primeng'
      },
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
