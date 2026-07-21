import { Component } from '@angular/core'
import { ButtonModule } from 'primeng/button'
import { PIcon } from '@primeicons/angular/p-icon'
import { RouterModule } from '@angular/router'

@Component({
  selector: 'app-cta',
  imports: [RouterModule, ButtonModule, PIcon],
  templateUrl: './cta.html',
  styleUrl: './cta.css'
})
export class Cta {}
