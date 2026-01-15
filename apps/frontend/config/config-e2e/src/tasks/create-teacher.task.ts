import { Page } from "@playwright/test";
import { Actor } from "../actors/actor";
import { Task } from "./task";

export class CreateTeacherTask extends Task {
    constructor(public name: string, public page: Page) {
        super();
    }
    async performAs(actor: Actor): Promise<void> {
        await this.page.goto('/teacher');
        await this.page.locator('button[data-testid="add-teacher-button"]').click();
        await this.page.locator('input[data-testid="input-name"]').fill(this.name);
        // Esperar a que la petición HTTP se complete cuando hacemos clic en submit
        const responsePromise = this.page.waitForResponse(response => 
            response.url().includes('/api/teacher') && response.request().method() === 'POST'
        );
        await this.page.locator('button[data-testid="submit-button"]').click();    

    
    // Esperar la respuesta del servidor
    await responsePromise;
    
    // Esperar a que el modal desaparezca
    await this.page.locator('mat-dialog-container').waitFor({ state: 'detached' });
    // O alternativamente:
    // await this.page.locator('input[data-testid="input-name"]').waitFor({ state: 'detached' });
    
    // Esperar a que aparezca el nuevo teacher en la tabla
    }
}