import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  ApiChangeTaskStateSuccess,
  ApiCreateTaskSuccess, ApiDeleteTaskSuccess,
  ApiListTasksSuccess,
  changeTaskState,
  createTask, deleteTask,
  listTasks
} from './task.action';
import { exhaustMap, map } from 'rxjs';
import { TaskService } from '@task-manager/ng-api-client/tasks';

@Injectable()
export class TaskEffects {

  loadTasks$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(listTasks),
      exhaustMap(() =>
        this.taskService.listTasks$().pipe(map((tasks) => ApiListTasksSuccess({ tasks })))
      )
    );
  });

  createTask$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(createTask),
      exhaustMap((props) =>
        this.taskService.createTask$(props.task).pipe(map((task) => ApiCreateTaskSuccess({ task })))
      )
    );
  })

  changeTaskState$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(changeTaskState),
      exhaustMap((props) =>
        this.taskService.changeTaskState(props.taskId, props.done).pipe(map((task) => ApiChangeTaskStateSuccess({ task })))
      )
    );
  })

  deleteTask$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deleteTask),
      exhaustMap((props) =>
        this.taskService.deleteTask$(props.id).pipe(map((task) => ApiDeleteTaskSuccess({ task })))
      )
    );
  })

  constructor(
    private readonly actions$: Actions,
    private readonly taskService: TaskService
  ) {
  }

}
