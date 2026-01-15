import { Actor } from "../actors/actor";
import { Question } from "./question";

export class TeacherDeletedQuestion extends Question {
    constructor(private name: string, private page: Page) {
        super();
    }
    override async answeredBy(actor: Actor): Promise<boolean> {
        await this.page.locator('table').locator(`text=${this.name}`).waitFor({ state: 'detached' });
        return true;
        // const count = await this.page.locator('table').locator(`text=${this.name}`).count();
        // console.log('count', count);
        // return count === 0;
    }
}