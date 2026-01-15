import { Actor } from "../actors/actor";
import { Task } from "./task";
import { Page } from "@playwright/test";

export class DeleteTeacherTask extends Task {
    constructor(private name: string, private page: Page) {
        super();
    }
    async performAs(actor: Actor): Promise<void> {
        await this.page.goto('/teacher');
        // Esperar a que la petición HTTP se complete cuando hacemos clic en submit
        const responsePromise = this.page.waitForResponse(response => 
            response.url().includes('/api/teacher') && response.request().method() === 'DELETE'
        );
        const reloadPromise = this.page.waitForResponse(response => 
            response.url().includes('/api/teacher') && response.request().method() === 'GET'
        );
        await this.page.locator(`button[data-testid="delete-button-${this.name}"]`).click();
        await this.page.locator('button[data-testid="confirm-delete-button"]').click();

        await responsePromise;
        await this.page.locator('mat-dialog-container').waitFor({ state: 'detached' });
        await reloadPromise;
    }
}   