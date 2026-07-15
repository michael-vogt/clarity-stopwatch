import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClarityTasksInputComponent } from './clarity-tasks-input.component';

describe('ClarityTasksInputComponent', () => {
  let component: ClarityTasksInputComponent;
  let fixture: ComponentFixture<ClarityTasksInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClarityTasksInputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ClarityTasksInputComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
