import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClarityTasksListComponent } from './clarity-tasks-list.component';

describe('ClarityTasksListComponent', () => {
  let component: ClarityTasksListComponent;
  let fixture: ComponentFixture<ClarityTasksListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClarityTasksListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ClarityTasksListComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
