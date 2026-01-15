export abstract class Task {
    abstract performAs(actor: Actor): Promise<void> 
}