import { Component, computed, signal } from '@angular/core'
import { ButtonModule } from 'primeng/button'
import { SelectButtonModule } from 'primeng/selectbutton'
import { PIcon } from '@primeicons/angular/p-icon'
import { FormsModule } from '@angular/forms'

type Language = 'JavaScript' | 'React' | 'Node.js' | 'Python' | 'Go'

@Component({
  selector: 'app-sdk-section',
  imports: [FormsModule, ButtonModule, SelectButtonModule, PIcon],
  templateUrl: './sdk-section.html',
  styleUrl: './sdk-section.css'
})
export class SdkSection {
  protected readonly languages: Language[] = ['JavaScript', 'React', 'Node.js', 'Python', 'Go']
  protected readonly activeLanguage = signal<Language>('JavaScript')
  protected readonly copied = signal(false)

  private readonly snippets: Record<Language, string> = {
    JavaScript: `import { Featurix } from '@featurix/js';

    const client = Featurix.init('YOUR_SDK_KEY');

    if (client.isEnabled('checkout-v2', { userId: user.id })) {
      renderNewCheckout();
    }`,
    React: `import { useFlag } from '@featurix/react';

    function Checkout() {
      const isEnabled = useFlag('checkout-v2');
      return isEnabled ? <CheckoutV2 /> : <CheckoutV1 />;
    }`,
    'Node.js': `const { Featurix } = require('@featurix/node');

    const client = Featurix.init(process.env.FEATURIX_KEY);

    app.get('/checkout', (req, res) => {
      const enabled = client.isEnabled('checkout-v2', { userId: req.user.id });
      res.render(enabled ? 'checkout-v2' : 'checkout-v1');
    });`,
    Python: `from featurix import Client

    client = Client(sdk_key="YOUR_SDK_KEY")

    if client.is_enabled("checkout-v2", user_id=user.id):
        render_new_checkout()`,
    Go: `client := featurix.New("YOUR_SDK_KEY")

    enabled := client.IsEnabled("checkout-v2", featurix.User{
        ID: user.ID,
    })

    if enabled {
        renderNewCheckout()
    }`
  }

  protected readonly activeSnippet = computed(() => this.snippets[this.activeLanguage()])

  copySnippet(): void {
    navigator.clipboard?.writeText(this.activeSnippet()).then(() => {
      this.copied.set(true)
      setTimeout(() => this.copied.set(false), 1800)
    })
  }
}
