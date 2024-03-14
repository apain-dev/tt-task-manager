import { expect, test } from '@playwright/test';
import { addTask } from './utils/add-task.util';

test('Task list', async ({ page }) => {
  await page.goto('/');

  const taskListContainer = page.getByTestId('task-list-container');
  // Expect h1 to contain a substring.
  await expect(taskListContainer).toBeVisible();
  await expect(taskListContainer.getByTestId('task-list-empty')).toBeVisible();
});

test('Add task', async ({ page }) => {
  await page.goto('/');
  await addTask(page);
  const taskListContainer = page.getByTestId('task-list-container');
  await expect(taskListContainer.getByTestId('task-list-empty')).toBeHidden();
  await expect(page.locator('tm-tasks-card')).toBeVisible();
});
