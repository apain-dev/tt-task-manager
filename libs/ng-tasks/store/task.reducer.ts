import { createReducer, on } from '@ngrx/store';
import {
  ApiChangeTaskStateSuccess,
  ApiCreateTaskSuccess,
  ApiDeleteTaskSuccess,
  ApiListTasksSuccess,
  changeTaskState,
  createTask,
  listTasks,
  setTaskFilters,
} from './task.action';
import { TasksState } from './store.model';

const initialState: TasksState = {
  tasks: [],
  loading: false,
  filters: {},
  error: null,
};
export const taskReducer = createReducer<TasksState>(
  initialState,
  on(listTasks, (state): TasksState => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(ApiListTasksSuccess, (state, { tasks }): TasksState => {
    return {
      ...state,
      tasks,
      loading: false,
    };
  }),
  on(createTask, (state): TasksState => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(ApiCreateTaskSuccess, (state, { task }): TasksState => {
    return {
      ...state,
      tasks: [...state.tasks, task],
      loading: false,
    };
  }),
  on(changeTaskState, (state): TasksState => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(ApiChangeTaskStateSuccess, (state, { task }): TasksState => {
    return {
      ...state,
      tasks: state.tasks.map((t) => (t.id === task.id ? task : t)),
      loading: false,
    };
  }),
  on(ApiDeleteTaskSuccess, (state, { task }): TasksState => {
    return {
      ...state,
      tasks: state.tasks.filter((t) => t.id !== task.id),
      loading: false,
    };
  }),
  on(setTaskFilters, (state, filters): TasksState => {
    return {
      ...state,
      filters: filters.filters,
    };
  })
);
