import { Page } from "@playwright/test";
import { Actor } from "./actor";
import { Task } from "../tasks/task";
import { Question } from "../questions/question";

export class UserActor extends Actor {
    constructor(public name: string, public page: Page) {
        super();
    }
    async attemptsTo(task: Task): Promise<void> {
        await task.performAs(this);
    }
    async answer(question: Question): Promise<boolean> {
        return await question.answeredBy(this);
    }
}