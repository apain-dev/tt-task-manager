import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {provideMockStore} from '@ngrx/store/testing';
import { AddTaskDialog } from './add-task.dialog';
import { MatDialogRef } from '@angular/material/dialog';

describe('TestComponent', () => {
  let component: AddTaskDialog;
  let fixture: ComponentFixture<AddTaskDialog>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule],
      providers: [provideMockStore({ initialState: { tasks: {tasks: [], loading: false, filters: {}} } }), {
        provide: MatDialogRef,
        useValue: {},
      }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTaskDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
