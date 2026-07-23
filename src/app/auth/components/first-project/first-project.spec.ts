import { ComponentFixture, TestBed } from '@angular/core/testing'

import { FirstProject } from './first-project'

describe('FirstProject', () => {
  let component: FirstProject
  let fixture: ComponentFixture<FirstProject>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FirstProject]
    }).compileComponents()

    fixture = TestBed.createComponent(FirstProject)
    component = fixture.componentInstance
    await fixture.whenStable()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
