import { ChangeDetectionStrategy, Component, inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCard, MatCardContent, MatCardFooter, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { Task } from '@task-manager/ng-api-client/tasks';
import { MatIcon } from '@angular/material/icon';
import { MatButton, MatIconButton } from '@angular/material/button';
import { changeTaskState, deleteTask } from '../../store/task.action';
import { Store } from '@ngrx/store';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';

@Component({
  standalone: true,
  selector: 'task-card',
  templateUrl: './task.card.html',
  imports: [
    CommonModule, MatCard, MatCardHeader, MatCardTitle, MatCardContent, MatCardFooter, MatIcon, MatButton,
    MatIconButton, MatMenuTrigger, MatMenu, MatMenuItem
  ],
  styleUrl: './task.card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskCard implements OnInit {
  @Input() task!: Task;

  private readonly store = inject(Store);

  ngOnInit() {
    if (!this.task) {
      throw new Error('TaskCard requires a task input');
    }
  }

  changeTaskState(done: boolean) {
    this.store.dispatch(changeTaskState({ id: this.task.id, done }));
  }

  deleteTask() {
    this.store.dispatch(deleteTask({ id: this.task.id }));
  }
}
