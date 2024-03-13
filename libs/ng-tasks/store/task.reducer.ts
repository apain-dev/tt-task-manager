import { createReducer, on } from '@ngrx/store';
import {
  ApiChangeTaskStateSuccess,
  ApiCreateTaskSuccess,
  ApiDeleteTaskSuccess,
  ApiListTasksSuccess,
  listTasks, setTaskFilters
} from './task.action';
import { TasksState } from './store.model';

export const initialState: TasksState = {
  tasks: [],
  loading: false,
  filters: {},
  error: null
};
export const taskReducer = createReducer<TasksState>(
  initialState,
  on(listTasks, (state, { id, label, done }) => {
    return {
      ...state,
      loading: true
    };
  }),
  on(ApiListTasksSuccess, (state, { tasks }) => {
    return {
      ...state,
      tasks,
      loading: false
    };
  }),
  on(ApiCreateTaskSuccess, (state, { task }) => {
    return {
      ...state,
      tasks: [...state.tasks, task]
    };
  }),
  on(ApiChangeTaskStateSuccess, (state, { task }) => {
    return {
      ...state,
      tasks: state.tasks.map((t) => t.id === task.id ? task : t)
    };
  }),
  on(ApiDeleteTaskSuccess, (state, { task }) => {
    return {
      ...state,
      tasks: state.tasks.filter((t) => t.id !== task.id)
    };
  }),
  on(setTaskFilters, (state, filters) => {
    return {
      ...state,
      filters
    };
  })
);
