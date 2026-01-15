import { Actor } from "../actors/actor";

export abstract class Question {
    abstract answeredBy(actor: Actor): Promise<boolean>
}