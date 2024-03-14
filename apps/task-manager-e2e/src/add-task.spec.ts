import { expect, test } from '@playwright/test';

test('Add task dialog', async ({ page }) => {
  await page.goto('/');

  const addTaskButton = page.getByTestId('add-task-button');
  await expect(addTaskButton).toBeVisible();
  await addTaskButton.click();
  const addTaskDialog = page.locator('add-task-dialog');
  await expect(addTaskDialog).toBeVisible();
  await expect(addTaskDialog.getByTestId('add-task-form-label')).toBeVisible();
  await expect(addTaskDialog.getByTestId('add-task-form-status')).toBeVisible();
  await expect(addTaskDialog.getByTestId('add-task-form-submit')).toBeVisible();
  await expect(
    addTaskDialog.getByTestId('add-task-form-submit')
  ).toBeDisabled();
});
test('Add task dialog - invalid form', async ({ page }) => {
  await page.goto('/');
  const openAddTaskButton = page.getByTestId('add-task-button');
  await openAddTaskButton.click();

  const addTaskDialog = page.locator('add-task-dialog');
  const addTaskButton = addTaskDialog.getByTestId('add-task-form-submit');
  const addTaskLabelFormField = addTaskDialog.getByTestId(
    'add-task-form-label'
  );
  const addTaskLabelInput = addTaskLabelFormField.locator('input');

  await addTaskLabelInput.fill('a');
  await addTaskLabelInput.press('Tab');
  expect(
    await addTaskLabelFormField.locator('mat-error').innerText()
  ).toContain('at least 3 characters');
  await expect(addTaskButton).toBeDisabled();
});
test('Add task dialog - empty form', async ({ page }) => {
  await page.goto('/');
  const openAddTaskButton = page.getByTestId('add-task-button');
  await openAddTaskButton.click();

  const addTaskDialog = page.locator('add-task-dialog');
  const addTaskButton = addTaskDialog.getByTestId('add-task-form-submit');
  const addTaskLabelFormField = addTaskDialog.getByTestId(
    'add-task-form-label'
  );
  const addTaskLabelInput = addTaskLabelFormField.locator('input');

  await addTaskLabelInput.fill('');
  await addTaskLabelInput.press('Tab');
  expect(
    await addTaskLabelFormField.locator('mat-error').innerText()
  ).toContain('is required');
  await expect(addTaskButton).toBeDisabled();
});

test('Add task dialog - valid form', async ({ page }) => {
  await page.goto('/');
  const openAddTaskButton = page.getByTestId('add-task-button');
  await openAddTaskButton.click();

  const addTaskDialog = page.locator('add-task-dialog');
  const addTaskButton = addTaskDialog.getByTestId('add-task-form-submit');
  const addTaskLabelFormField = addTaskDialog.getByTestId(
    'add-task-form-label'
  );
  const addTaskLabelInput = addTaskLabelFormField.locator('input');

  await addTaskLabelInput.fill('new task');
  await addTaskLabelInput.press('Tab');
  await expect(addTaskButton).toBeEnabled();
  await addTaskButton.click();
  await expect(addTaskDialog).toBeHidden();
  await expect(
    page.locator('task-list-container').getByTestId('task-list-empty')
  ).toBeHidden();
  expect(await page.locator('tm-tasks-card').count()).toEqual(1);
});
