import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClarityStopwatchComponent } from './clarity-stopwatch.component';

describe('ClarityStopwatchComponent', () => {
  let component: ClarityStopwatchComponent;
  let fixture: ComponentFixture<ClarityStopwatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClarityStopwatchComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ClarityStopwatchComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
