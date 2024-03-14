import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {provideMockStore} from '@ngrx/store/testing';
import { TaskCard } from './task.card';

describe('TestComponent', () => {
  let component: TaskCard;
  let fixture: ComponentFixture<TaskCard>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule],
      providers: [provideMockStore({ initialState: { tasks: {tasks: [], loading: false, filters: {}} } })],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskCard);
    component = fixture.componentInstance;
    fixture.componentInstance.task = {id: 1, label: 'Task label', done: false};
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });

  it('should throw error if task is not provided', () => {
    // @ts-expect-error Testing error case
    fixture.componentInstance.task = undefined;
    expect(() => component.ngOnInit()).toThrowError();
  });
});
