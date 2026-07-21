import { ChangeDetectionStrategy, Component, input } from '@angular/core'

@Component({
  selector: 'app-logo-with-name',
  imports: [],
  templateUrl: './logo-with-name.html',
  styleUrl: './logo-with-name.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[style.width]': 'width()',
    '[style.height]': 'height()'
  }
})
export class LogoWithName {
  readonly width = input('220px')
  readonly height = input('64px')
}
