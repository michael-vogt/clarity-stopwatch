import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClarityTasksEffordloggingComponent } from './clarity-tasks-effordlogging.component';

describe('ClarityTasksEffordloggingComponent', () => {
  let component: ClarityTasksEffordloggingComponent;
  let fixture: ComponentFixture<ClarityTasksEffordloggingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClarityTasksEffordloggingComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ClarityTasksEffordloggingComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
