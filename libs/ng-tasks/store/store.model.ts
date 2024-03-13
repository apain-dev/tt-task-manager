import { Task } from '@task-manager/ng-api-client/tasks';

export interface TasksState {
  tasks: Task[],
  filters: Partial<Pick<Task, 'id' | 'done' | 'label'>>
  loading: boolean,
  error: null
}

export interface AppState {
  tasks: TasksState;
}

