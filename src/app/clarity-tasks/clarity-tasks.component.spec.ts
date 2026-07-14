import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClarityTasksComponent } from './clarity-tasks.component';

describe('ClarityTasksComponent', () => {
  let component: ClarityTasksComponent;
  let fixture: ComponentFixture<ClarityTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClarityTasksComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ClarityTasksComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
