import { ComponentFixture, TestBed } from '@angular/core/testing'

import { Onboarded } from './onboarded'

describe('Onboarded', () => {
  let component: Onboarded
  let fixture: ComponentFixture<Onboarded>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Onboarded]
    }).compileComponents()

    fixture = TestBed.createComponent(Onboarded)
    component = fixture.componentInstance
    await fixture.whenStable()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
