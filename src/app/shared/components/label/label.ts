import { CommonModule } from '@angular/common'
import { Component, input } from '@angular/core'
import { LabelModule } from 'primeng/label'

@Component({
  selector: 'app-label',
  imports: [CommonModule, LabelModule],
  templateUrl: './label.html',
  styleUrl: './label.css'
})
export class Label {
  for = input<string>('')
  required = input<boolean>(false)
  class = input<string>('')
}
