import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { TimetableDayEntry } from "@organizer/scenario-api";
import { BehaviorSubject, Observable } from "rxjs";
export class TimetableDataSource extends  DataSource<Array<TimetableDayEntry>> {
    // private data = new BehaviorSubject<Timetable[]>([]);
    override connect(collectionViewer: CollectionViewer): Observable<readonly Array<TimetableDayEntry>[]> {
        return this.data;
    }
    override disconnect(collectionViewer: CollectionViewer): void { }
    constructor(public data: BehaviorSubject<readonly Array<TimetableDayEntry>[]>) {
        super();
    }
}