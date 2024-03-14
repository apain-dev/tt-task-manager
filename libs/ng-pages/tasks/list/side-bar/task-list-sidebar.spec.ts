import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {provideMockStore} from '@ngrx/store/testing';
import { TaskListSidebarComponent } from './task-list-sidebar.component';

describe('TestComponent', () => {
  let component: TaskListSidebarComponent;
  let fixture: ComponentFixture<TaskListSidebarComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule],
      providers: [provideMockStore({ initialState: { tasks: {tasks: [], loading: false, filters: {}} } })],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskListSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
