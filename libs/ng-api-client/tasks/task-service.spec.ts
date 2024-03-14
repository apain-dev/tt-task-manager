import { TaskService } from './task.service';
import { firstValueFrom } from 'rxjs';
import { Task } from './models/task.model';

const localStorageMock = (function () {
  let store: Record<string, string> = {};

  return {
    getItem(key: string) {
      return store[key];
    },

    setItem(key: string, value: string) {
      store[key] = value;
    },

    clear() {
      store = {};
    },

    removeItem(key: string) {
      delete store[key];
    },

    getAll() {
      return store;
    },
  };
})();

const tasks: Task[] = [
  {
    id: 1,
    label: 'Task 1',
    done: false,
  },
  {
    id: 2,
    label: 'Task 2',
    done: true,
  },
];

Object.defineProperty(window, 'localStorage', { value: localStorageMock });
describe('TaskService', () => {
  let taskService: TaskService;

  beforeAll(() => {
    taskService = new TaskService();
    window.localStorage.setItem('tasks', JSON.stringify(tasks));
  });

  it('should return the list of tasks', async () => {
    const tasks = await firstValueFrom(taskService.listTasks$());
    expect(tasks).toEqual(tasks);
  });

  it('should create a task', async () => {
    const newTask = await firstValueFrom(
      taskService.createTask$({ label: 'Task 3', done: false })
    );
    expect(newTask.label).toEqual('Task 3');
    expect(newTask.done).toEqual(false);
    expect(window.localStorage.getItem('tasks')).toEqual(
      JSON.stringify([...tasks, newTask])
    );
  });

  it('should change the state of a task', async () => {
    const task = await firstValueFrom(taskService.changeTaskState(1, true));
    expect(task.done).toEqual(true);
    const updatedTasks = JSON.parse(
      window.localStorage.getItem('tasks') || '[]'
    );
    expect(updatedTasks.find((t: Task) => t.id === 1)?.done).toEqual(true);
  });

  it('should fail to change the state of a task', async () => {
    try {
      await firstValueFrom(taskService.changeTaskState(3, true));
    } catch (e) {
      expect(e).toEqual('Task not found');
    }
  });
  it('should delete task', async () => {
    const newTask = await firstValueFrom(
      taskService.createTask$({ label: 'Task 4', done: false })
    );
    expect(newTask.label).toEqual('Task 4');
    const deletedTask = await firstValueFrom(
      taskService.deleteTask$(newTask.id)
    );
    expect(deletedTask).toEqual(newTask);
    const tasks = JSON.parse(window.localStorage.getItem('tasks') || '[]');
    expect(tasks.find((t: Task) => t.id === newTask.id)).toBeUndefined();
  });
});
