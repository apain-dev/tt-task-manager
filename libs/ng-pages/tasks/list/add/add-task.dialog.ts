import { Component, inject } from '@angular/core';
import { data } from 'autoprefixer';
import { MatDialogActions, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { AddTaskForm } from '@task-manager/ng-tasks/forms/add-task';
import { Store } from '@ngrx/store';
import { createTask } from '@task-manager/ng-tasks/store/task.action';
import { CreateTask } from '@task-manager/ng-api-client/tasks';

@Component({
  standalone: true,
  selector: 'add-task-dialog',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    AddTaskForm
  ],
  templateUrl: './add-task.dialog.html'
})
export class AddTaskDialog {

  private readonly store = inject(Store);

  constructor() {
  }

  protected readonly data = data;

  formSubmitted(event: CreateTask) {
    this.store.dispatch(createTask({ task: event }));
    console.log(event);
  }
}
