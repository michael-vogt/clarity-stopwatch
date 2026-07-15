import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClarityTasksListItemComponent } from './clarity-tasks-list-item.component';

describe('ClarityTasksListItemComponent', () => {
  let component: ClarityTasksListItemComponent;
  let fixture: ComponentFixture<ClarityTasksListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClarityTasksListItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ClarityTasksListItemComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
