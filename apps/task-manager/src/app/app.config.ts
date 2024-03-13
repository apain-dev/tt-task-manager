import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideStore } from '@ngrx/store';
import { taskReducer, TaskEffects } from "@task-manager/ng-tasks";
import { provideEffects } from '@ngrx/effects';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(appRoutes), provideAnimationsAsync(), provideStore({tasks: taskReducer}), provideEffects([TaskEffects])],
};
