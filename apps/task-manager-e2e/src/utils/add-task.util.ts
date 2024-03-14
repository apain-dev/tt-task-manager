import { Page } from '@playwright/test';

export async function addTask(page: Page, done = false, label = 'Task label') {
  const openAddTaskButton = page.getByTestId('add-task-button');
  await openAddTaskButton.click();

  const addTaskDialog = page.locator('add-task-dialog');
  const addTaskButton = addTaskDialog.getByTestId('add-task-form-submit');
  const addTaskLabelFormField = addTaskDialog.getByTestId(
    'add-task-form-label'
  );
  const addTaskLabelInput = addTaskLabelFormField.locator('input');

  await addTaskLabelInput.fill(label);
  await addTaskLabelFormField.press('Tab');
  if (done) {
    await addTaskDialog.locator('mat-select').press('ArrowDown');
  }
  await addTaskButton.click();
}
