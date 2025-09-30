import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/');
    await expect(page).toHaveTitle(/The Internet/);
  });

  test('Add/Remove Elements section – add and remove element', async ({page}) => {
    await page.getByText('Add/Remove Elements').click();

    //assertions: URL + heading
    await expect(page).toHaveURL('https://the-internet.herokuapp.com/add_remove_elements/');
    await expect(page.getByRole('heading', { level: 3 })).toHaveText('Add/Remove Elements');

    //Add two elements via double click
    await page.getByText('Add Element').dblclick();

    //Locate all "Delete" buttons and assert there are two
    const deleteButtons = page.locator('button', { hasText: 'Delete' });
    await expect(deleteButtons).toHaveCount(2);

    //Click the first "Delete" button
    await deleteButtons.nth(0).click();

    //Assert that only one "Delete" button remains
    await expect(deleteButtons).toHaveCount(1);
  })

})




