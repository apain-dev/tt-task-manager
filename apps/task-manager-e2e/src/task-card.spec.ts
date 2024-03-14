import { expect, test } from '@playwright/test';
import { addTask } from './utils/add-task.util';

test('Task card', async ({ page }) => {
  await page.goto('/');
  await addTask(page, false, 'Task label');
  const taskCard = page.locator('tm-tasks-card');
  await expect( page.locator('tm-tasks-card')).toBeVisible();
  await expect(taskCard.locator('mat-card')).toHaveClass(/todo/);
  await expect(taskCard.getByTestId('task-card-label')).toContainText(
    'Task label'
  );
  await expect(taskCard.locator('button').nth(0)).toContainText('Done');
  await expect(taskCard.locator('button').nth(1)).toContainText('Delete');
});
test('Task card change status', async ({ page }) => {
  await page.goto('/');
  await addTask(page, false, 'Task label');

  const taskCard = page.locator('tm-tasks-card');
  await taskCard.locator('button').nth(0).click();
  await expect(taskCard).toBeVisible();

  await expect(taskCard.locator('mat-card')).toHaveClass(/done/);
  await expect(taskCard.getByTestId('task-card-label')).toContainText(
    'Task label'
  );
  await expect(taskCard.locator('button').nth(0)).toContainText('In progress');
  await expect(taskCard.locator('button').nth(1)).toContainText('Delete');
});
test('Task card delete', async ({ page }) => {
  await page.goto('/');
  await addTask(page, false, 'Task label');

  const taskCard = page.locator('tm-tasks-card');
  await taskCard.locator('button').nth(1).click();
  expect(await page.locator('tm-tasks-card').count()).toEqual(0);
});
