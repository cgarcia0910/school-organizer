import { Question } from "../questions/question";
import { Task } from "../tasks/task";

export abstract class Actor {
    abstract attemptsTo(task: Task): Promise<void>
    abstract answer(question: Question): Promise<boolean>
}