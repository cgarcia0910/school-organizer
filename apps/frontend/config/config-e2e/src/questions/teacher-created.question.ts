import { Page } from "@playwright/test";
import { Actor } from "../actors/actor";
import { Question } from "./question";

export class TeacherCreatedQuestion extends Question {
    constructor(private name: string, private page: Page) {
        super();
    }
    override async answeredBy(actor: Actor): Promise<boolean> {
        await this.page.locator('table').locator(`text=${this.name}`).waitFor({ state: 'visible' });
        return await this.page.locator('table').locator(`text=${this.name}`).isVisible();
    }
    
}