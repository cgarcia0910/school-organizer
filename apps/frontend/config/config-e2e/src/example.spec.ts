import { test, expect } from '@playwright/test';
import { UserActor } from './actors/user.actor';
import { CreateTeacherTask } from './tasks/create-teacher.task';
import { TeacherCreatedQuestion } from './questions/teacher-created.question';
import { DeleteTeacherTask } from './tasks/delete-teacher.task';
import { TeacherDeletedQuestion } from './questions/teacher-deleted.question';

test('has title', async ({ page }) => {
  await page.goto('/teacher');

  // Expect h1 to contain a substring.
  expect(await page.locator('h2').innerText()).toContain('Gestión de profesores');

  // expect to see a table with expected teachers
});
test('should show teachers', async ({ page }) => {
  // await page.route('**/api/teacher?page=1&limit=5', async (route) => {
  //   await route.fulfill({
  //     status: 200,
  //     contentType: 'application/json',
  //     body: JSON.stringify({
  //       "data": [
  //           {
  //               "id": 3,
  //               "name": "John Doe"
  //           },
  //           {
  //               "id": 2,
  //               "name": "Jane Doe"
  //           }
  //       ],
  //       "meta": {
  //           "page": "1",
  //           "limit": "5",
  //           "total": 3
  //       }
  //   }),
  //   });
  // });
  await page.goto('/teacher');
  expect(await page.locator('table').innerText()).toContain('John Doe');
});

test('should create teacher', async ({ page }) => {
  // await page.goto('/teacher');
  const defaultUser = await new UserActor('John Doe', page)
  await defaultUser.attemptsTo(new CreateTeacherTask('Test Teacher 3', page));
  await defaultUser.answer(new TeacherCreatedQuestion('Test Teacher 3', page));
});

test('should delete teacher', async ({ page }) => {
  const defaultUser = await new UserActor('John Doe', page)
  await defaultUser.attemptsTo(new CreateTeacherTask('TestTeacherToDelete', page));
  await defaultUser.attemptsTo(new DeleteTeacherTask('TestTeacherToDelete', page));
  await defaultUser.answer(new TeacherDeletedQuestion('TestTeacherToDelete', page));
});