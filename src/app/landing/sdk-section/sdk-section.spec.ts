import { ComponentFixture, TestBed } from '@angular/core/testing'

import { SdkSection } from './sdk-section'

describe('SdkSection', () => {
  let component: SdkSection
  let fixture: ComponentFixture<SdkSection>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SdkSection]
    }).compileComponents()

    fixture = TestBed.createComponent(SdkSection)
    component = fixture.componentInstance
    await fixture.whenStable()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
