import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClarityStopwatchTaskComponent } from './clarity-stopwatch-task.component';

describe('ClarityStopwatchTaskComponent', () => {
  let component: ClarityStopwatchTaskComponent;
  let fixture: ComponentFixture<ClarityStopwatchTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClarityStopwatchTaskComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ClarityStopwatchTaskComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
