import { AppState } from './store.model';
import { createSelector } from '@ngrx/store';

export const selectTasks = (state: AppState) => state.tasks.tasks;
export const selectFilters = (state: AppState) => state.tasks.filters;

export const selectFilteredTasks = createSelector(
  selectTasks,
  selectFilters,
  (tasks, filters) => {
    return tasks.filter((task) => {
      if (!!filters.id && task.id !== filters.id) {
        return false;
      }
      if (!!filters.label && !task.label.includes(filters.label)) {
        return false;
      }
      return !(filters.done !== null && filters.done !== undefined && task.done !== filters.done);
    });
  }
);

export const selectTasksState = (state: AppState) => state.tasks;

export const selectTaskCount = (state: AppState) => state.tasks.tasks.length;
export const selectHasTasks = (state: AppState) => state.tasks.tasks.length > 0 && !state.tasks.loading;
