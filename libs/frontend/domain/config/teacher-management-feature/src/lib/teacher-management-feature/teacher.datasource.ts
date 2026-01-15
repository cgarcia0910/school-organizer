import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { Teacher, TeacherService } from "@organizer/teacher-api";
import { map, Observable, switchMap, tap, BehaviorSubject, Subject, filter, combineLatest } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable()
export class TeacherDataSource extends DataSource<any> {
    private pageNumber = new BehaviorSubject<number>(1);
    page$: Observable<Teacher[]>;
    total$: Subject<number> = new Subject<number>();
    private refresh$ = new BehaviorSubject<Boolean>(true);
    override connect(collectionViewer: CollectionViewer): Observable<readonly Teacher[]> {
        return this.page$
    }
    override disconnect(collectionViewer: CollectionViewer): void {}
    constructor(private teacherService: TeacherService) {
        super();
        this.page$ = combineLatest({page: this.pageNumber, refresh: this.refresh$}).pipe(
            switchMap(({page}) => this.teacherService.teacherGet(page, 5)),
            tap(response => this.total$.next(response.meta.total)),
            map(response => response.data)
        );
    }
    fetch(page: number): void {
        this.pageNumber.next(page+1);
    }
    refresh(): void {
        this.refresh$.next(true);
    }
}