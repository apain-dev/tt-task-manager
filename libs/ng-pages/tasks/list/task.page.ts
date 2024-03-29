import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import {
  listTasks,
  selectFilteredTasks,
  selectTaskCount,
} from '@task-manager/ng-tasks/store';
import { MatButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { TaskCard } from '@task-manager/ng-tasks/cards/task';
import { AddTaskDialog } from './add/add-task.dialog';
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio';
import { MatFormField } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { TaskListSidebarComponent } from './side-bar/task-list-sidebar.component';

@Component({
  selector: 'task-page',
  standalone: true,
  imports: [
    CommonModule,
    MatButton,
    TaskCard,
    MatRadioGroup,
    MatRadioButton,
    MatFormField,
    FormsModule,
    MatInput,
    TaskListSidebarComponent,
  ],
  templateUrl: './task.page.html',
})
export class TaskPage {
  private readonly store = inject(Store);

  private readonly dialog = inject(MatDialog);

  readonly tasks$ = this.store.select(selectFilteredTasks);

  readonly tasksCount$ = this.store.select(selectTaskCount);

  constructor() {
    this.store.dispatch(listTasks({}));
  }

  addTask() {
    this.dialog.open(AddTaskDialog, {});
  }
}
