import { Component } from '@angular/core'
import { ButtonModule } from 'primeng/button'
import { Card } from 'primeng/card'
import { InputGroup } from 'primeng/inputgroup'
import { InputGroupAddon } from 'primeng/inputgroupaddon'
import { InputTextModule } from 'primeng/inputtext'
import { TextareaModule } from 'primeng/textarea'
import { BadgeModule } from 'primeng/badge';
import { PIcon } from "@primeicons/angular/p-icon";


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
    PIcon
],
  templateUrl: './first-project.html',
  styleUrl: './first-project.css'
})
export class FirstProject {}
