import { expect, test } from '@playwright/test';
import { addTask } from './utils/add-task.util';

test('has filters', async ({ page }) => {
  await page.goto('/');

  // Expect h1 to contain a substring.
  await expect(page.locator('task-list-sidebar')).toBeVisible();
  const doneFilter = page
    .locator('task-list-sidebar')
    .getByTestId('filter-done');
  await expect(doneFilter).toBeVisible();
  expect(await doneFilter.locator('mat-radio-button').count()).toBe(2);
  await expect(
    page.locator('task-list-sidebar').getByTestId('filter-label')
  ).toBeVisible();
  await expect(
    page.locator('task-list-sidebar').getByTestId('filter-reset')
  ).toBeVisible();
});

test('Filter tasks', async ({ page }) => {
  await page.goto('/');

  await addTask(page, true, 'test');
  await addTask(page, false);

  await page
    .locator('task-list-sidebar')
    .locator('mat-radio-button')
    .nth(1)
    .locator('input')
    .click();
  // Wait for the debounceTime
  await page.waitForTimeout(500);
  expect(await page.locator('tm-tasks-card').count()).toEqual(1);
  await page
    .locator('task-list-sidebar')
    .locator('mat-radio-button')
    .nth(0)
    .locator('input')
    .click();
  // Wait for the debounceTime
  await page.waitForTimeout(500);
  expect(await page.locator('tm-tasks-card').count()).toEqual(1);
  await page.locator('task-list-sidebar').getByTestId('filter-reset').click();
  await page.waitForTimeout(500);
  expect(await page.locator('tm-tasks-card').count()).toEqual(2);

  await page
    .locator('task-list-sidebar')
    .getByTestId('filter-label')
    .locator('input')
    .fill('Task');
  await page.waitForTimeout(500);
  expect(await page.locator('tm-tasks-card').count()).toEqual(1);
  await page
    .locator('task-list-sidebar')
    .getByTestId('filter-label')
    .locator('input')
    .fill('NO MATCH');
  await page.waitForTimeout(500);
  expect(await page.locator('tm-tasks-card').count()).toEqual(0);
  await page.locator('task-list-sidebar').getByTestId('filter-reset').click();
  await page.waitForTimeout(500);
  expect(await page.locator('tm-tasks-card').count()).toEqual(2);
});
