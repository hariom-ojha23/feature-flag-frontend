import { Component, input, output } from '@angular/core'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { ButtonModule } from 'primeng/button'
import { DialogModule } from 'primeng/dialog'
import { InputTextModule } from 'primeng/inputtext'
import { Label } from '../../../shared/components/label/label'
import { SelectModule } from 'primeng/select'

@Component({
  selector: 'app-project-form',
  imports: [DialogModule, Label, InputTextModule, ButtonModule, SelectModule, ReactiveFormsModule],
  templateUrl: './project-form.html',
  styleUrl: './project-form.css'
})
export class ProjectForm {
  visible = input.required<boolean>()

  onHide = output<void>()

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    key: new FormControl('', Validators.required),
    initials: new FormControl('', Validators.required),
    description: new FormControl(''),
    environments: new FormControl([]),
  })
}
