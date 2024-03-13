import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateTask } from './models/create-task.model';
import { Task } from './models/task.model';

@Injectable({ providedIn: 'root' })
export class TaskService {
  listTasks$() {
    return new Observable<Task[]>((observer) => {
      let tasks: Task[] = [];
      try {
        tasks = this.readTasks();
      } catch (e) {
        observer.next([]);
      }
      observer.next(tasks);
      observer.complete();
    });
  }

  createTask$(task: CreateTask) {
    return new Observable<Task>((observer) => {
      let tasks: Task[] = [];
      try {
        tasks = this.readTasks();
      } catch (e) {
        console.error('Error reading tasks. Resetting cache', e);
      }
      const highestId = tasks.reduce((acc, t) => t.id > acc ? t.id : acc, 0);
      const newTask = { ...task, id: highestId + 1 };
      tasks.push(newTask);
      localStorage.setItem('tasks', JSON.stringify(tasks));
      observer.next(newTask);
      observer.complete();
    });
  }

  changeTaskState(id: number, done: boolean) {
    return new Observable<Task>((observer) => {
      let tasks: Task[] = [];
      try {
        tasks = this.readTasks();
      } catch (e) {
        console.error('Error reading tasks. Resetting cache', e);
      }
      const task = tasks.find((t) => t.id === id);
      if (task) {
        task.done = done;
        localStorage.setItem('tasks', JSON.stringify(tasks));
        observer.next(task);
      } else {
        observer.error('Task not found');
      }
      observer.complete();
    });
  }

  private readTasks(): Task[] {
    const tasks = localStorage.getItem('tasks');
    if (!tasks) {
      return [];
    } else {
      return JSON.parse(tasks);
    }
  }

  deleteTask$(id: number) {
    return new Observable<Task>((observer) => {
      let tasks: Task[] = [];
      try {
        tasks = this.readTasks();
      } catch (e) {
        console.error('Error reading tasks. Resetting cache', e);
      }
      const task = tasks.find((t) => t.id === id);
      if (task) {
        tasks = tasks.filter((t) => t.id !== id);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        observer.next(task);
      } else {
        observer.error('Task not found');
      }
      observer.complete();
    });
  }
}
