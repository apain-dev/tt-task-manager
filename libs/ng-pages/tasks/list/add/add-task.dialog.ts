import { Component, inject } from '@angular/core';
import {
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { CreateTaskForm } from '@task-manager/ng-tasks/forms/create-task';
import { Store } from '@ngrx/store';
import { createTask } from '@task-manager/ng-tasks/store/task.action';
import { CreateTask } from '@task-manager/ng-api-client/tasks';

@Component({
  standalone: true,
  selector: 'add-task-dialog',
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, CreateTaskForm],
  templateUrl: './add-task.dialog.html',
})
export class AddTaskDialog {
  private readonly store = inject(Store);

  constructor(public dialogRef: MatDialogRef<AddTaskDialog>) {}

  formSubmitted(event: CreateTask) {
    this.store.dispatch(createTask({ task: event }));
    this.dialogRef.close();
  }
}
