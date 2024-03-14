import { createAction, props } from '@ngrx/store';
import { CreateTask, Task } from '@task-manager/ng-api-client/tasks';

export const listTasks = createAction(
  '[Task] List Tasks',
  props<{ id?: number; label?: string; done?: boolean }>()
);

export const createTask = createAction(
  '[Task] Create Task',
  props<{ task: CreateTask }>()
);

export const changeTaskState = createAction(
  '[Task] Complete Task',
  props<{ taskId: number; done: boolean }>()
);

export const deleteTask = createAction(
  '[Task] Delete Task',
  props<{ id: number }>()
);

export const setTaskFilters = createAction(
  '[Task] Set Task Filters',
  props<{ filters: Partial<Pick<Task, 'id' | 'done' | 'label'>> }>()
);

export const ApiListTasksSuccess = createAction(
  '[Task] API List Tasks Success',
  props<{ tasks: Task[] }>()
);

export const ApiListTasksFailure = createAction(
  '[Task] API List Tasks Failure',
  props<{ error: unknown }>()
);

export const ApiCreateTaskSuccess = createAction(
  '[Task] API Create Task Success',
  props<{ task: Task }>()
);

export const ApiCreateTaskFailure = createAction(
  '[Task] API Create Task Failure',
  props<{ error: unknown }>()
);

export const ApiChangeTaskStateSuccess = createAction(
  '[Task] API Complete Task Success',
  props<{ task: Task }>()
);
export const ApiChangeTaskStateError = createAction(
  '[Task] API Complete Task Error',
  props<{ error: Error }>()
);

export const ApiDeleteTaskSuccess = createAction(
  '[Task] API Delete Task Success',
  props<{ task: Task }>()
);

export const ApiDeleteTaskFailure = createAction(
  '[Task] API Delete Task Failure',
  props<{ error: unknown }>()
);
