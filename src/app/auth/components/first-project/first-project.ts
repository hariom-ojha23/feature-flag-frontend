import { Component, inject } from '@angular/core'
import { ButtonModule } from 'primeng/button'
import { Card } from 'primeng/card'
import { InputGroup } from 'primeng/inputgroup'
import { InputGroupAddon } from 'primeng/inputgroupaddon'
import { InputTextModule } from 'primeng/inputtext'
import { TextareaModule } from 'primeng/textarea'
import { BadgeModule } from 'primeng/badge'
import { PIcon } from '@primeicons/angular/p-icon'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { ProjectStatus } from '../../../shared/enums/project.enum'
import { debounceTime, distinctUntilChanged, of, switchMap } from 'rxjs'
import { SessionStore } from '../../../core/stores/session.store'
import { ProjectPayload } from '../../../feature/project/interfaces/project.interface'
import { ProjectService } from '../../../feature/project/services/project.service'

@Component({
  selector: 'app-first-project',
  imports: [
    Card,
    InputGroup,
    InputGroupAddon,
    InputTextModule,
    TextareaModule,
    ButtonModule,
    BadgeModule,
    PIcon,
    ReactiveFormsModule
  ],
  templateUrl: './first-project.html',
  styleUrl: './first-project.css'
})
export class FirstProject {
  private readonly projectService = inject(ProjectService)
  private readonly session = inject(SessionStore)

  form = new FormGroup({
    key: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    description: new FormControl(''),
    status: new FormControl(ProjectStatus.ACTIVE, Validators.required)
  })

  constructor() {
    this.form
      .get('name')
      ?.valueChanges.pipe(
        debounceTime(400),
        distinctUntilChanged(),
        switchMap((name: string | null) => {
          return name ? this.projectService.previewProjectKey(name) : of({ key: '' })
        })
      )
      .subscribe((res) => {
        this.form.get('key')?.patchValue(res?.key)
      })
  }

  createProject() {
    const payload = this.form.value as ProjectPayload
    this.session.createFirstProject(payload)
  }
}
